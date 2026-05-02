/// <reference types="vite/client" />
import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';

const API_BASENAME = '/api';
const api = new Hono();

if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// Use import.meta.glob to find all route.js files at build time
const API_ROUTES = import.meta.glob('../src/app/api/**/route.js', {
  eager: true,
});

const API_PATH_PREFIX = '../src/app/api';

// Helper function to transform file path to Hono route path
function getHonoPath(routeFile: string): { name: string; pattern: string }[] {
  // routeFile is like "../src/app/api/foo/route.js"
  let relativePath = routeFile.replace(API_PATH_PREFIX, '');
  // Remove leading slash if any
  if (relativePath.startsWith('/')) {
    relativePath = relativePath.slice(1);
  }
  
  const parts = relativePath.split('/').filter(Boolean);
  const routeParts = parts.slice(0, -1); // Remove 'route.js'
  
  if (routeParts.length === 0) {
    return [{ name: 'root', pattern: '' }];
  }
  
  const transformedParts = routeParts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [_, dots, param] = match;
      return dots === '...'
        ? { name: param, pattern: `:${param}{.+}` }
        : { name: param, pattern: `:${param}` };
    }
    return { name: segment, pattern: segment };
  });
  return transformedParts;
}

// Register all routes
async function registerRoutes() {
  const routeFiles = Object.keys(API_ROUTES).sort((a, b) => b.length - a.length);

  // Clear existing routes
  api.routes = [];

  for (const routeFile of routeFiles) {
    try {
      const route = API_ROUTES[routeFile] as any;

      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      for (const method of methods) {
        try {
          if (route[method]) {
            const parts = getHonoPath(routeFile);
            const honoPath = `/${parts.map(({ pattern }) => pattern).join('/')}`;
            const handler: Handler = async (c) => {
              const params = c.req.param();
              
              // In dev, we might want to re-import, but with eager: true in the glob,
              // it's already bundled. For simplicity, we use the already imported route.
              // If we really need hot-reload of the module content itself without
              // a full HMR of this builder, we'd need non-eager glob.
              // But standard Vite HMR will handle changes to route.js files by
              // re-executing this file if they are in the dependency graph.
              
              return await route[method](c.req.raw, { params });
            };
            const methodLowercase = method.toLowerCase();
            switch (methodLowercase) {
              case 'get':
                api.get(honoPath, handler);
                break;
              case 'post':
                api.post(honoPath, handler);
                break;
              case 'put':
                api.put(honoPath, handler);
                break;
              case 'delete':
                api.delete(honoPath, handler);
                break;
              case 'patch':
                api.patch(honoPath, handler);
                break;
              default:
                console.warn(`Unsupported method: ${method}`);
                break;
            }
          }
        } catch (error) {
          console.error(`Error registering route ${routeFile} for method ${method}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error importing route file ${routeFile}:`, error);
    }
  }
}

// Initial route registration
await registerRoutes();

// Hot reload routes in development
if (import.meta.env.DEV && import.meta.hot) {
  import.meta.hot.accept(() => {
    // This will re-run the registration if this file changes.
    // If the route files themselves change, Vite's HMR will usually
    // trigger a reload of the modules that depend on them.
  });
}

export { api, API_BASENAME };
