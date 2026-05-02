import { vercelPreset } from "@vercel/react-router/vite";
import type { Config } from "@react-router/dev/config";

export default {
  // Tell React Router where your app code is
  appDirectory: "src/app",
  // Use the default build output directory
  buildDirectory: "build",
  // Enable SSR for Vercel serverless functions
  ssr: true,
  // Use Vercel preset for proper serverless deployment
  presets: [vercelPreset()],
} satisfies Config;
