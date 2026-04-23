import type { Config } from "@react-router/dev/config";

export default {
  // Use the default build output directory
  buildDirectory: "build",
  // Optimization: Tell React Router to ignore the mobile directory explicitly
  watchSignals: false,
  // Optimization: Disable expensive source maps in production to speed up tracing
} satisfies Config;
