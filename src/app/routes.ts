/// <reference types="vite/client" />
import {
  type RouteConfigEntry,
  index,
  route,
} from '@react-router/dev/routes';

// Use Vite's build-time glob to find all page.jsx files (lazy loading keys only)
const pages = import.meta.glob('./**/page.jsx');

function generateRoutesFromGlob(): RouteConfigEntry[] {
  const routes: RouteConfigEntry[] = [];
  
  // Convert glob keys (e.g., "./account/signin/page.jsx") into RouteConfigEntries
  for (const path of Object.keys(pages)) {
    // Remove "./" and "/page.jsx"
    let routePath = path.replace(/^\.\//, '').replace(/\/page\.jsx$/, '');
    
    // If it's the root page
    if (routePath === 'page.jsx') {
      routes.push(index('./page.jsx'));
      continue;
    }

    // Handle parameter routes (e.g., [id] -> :id)
    const segments = routePath.split('/');
    const processedSegments = segments.map((segment) => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        const paramName = segment.slice(1, -1);
        if (paramName.startsWith('...')) return '*';
        return `:${paramName}`;
      }
      return segment;
    });

    routes.push(route(processedSegments.join('/'), path));
  }

  return routes;
}

const notFound = route('*?', './__create/not-found.tsx');
const routes = [...generateRoutesFromGlob(), notFound];

export default routes;
