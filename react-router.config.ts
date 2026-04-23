import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@react-router/dev/presets/vercel";

export default {
  presets: [vercelPreset()],
  // Tell React Router where your app code is
  appDirectory: "src/app",
  // Use the default build output directory
  buildDirectory: "build",
  // Optimization: Tell React Router to ignore the mobile directory explicitly
  watchSignals: false,
  // Optimization: Disable expensive source maps in production to speed up tracing
} satisfies Config;
