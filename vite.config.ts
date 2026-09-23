// // @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// // or the app will break with duplicate plugins:
// //   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
// //     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
// //     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// // You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
// import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// export default defineConfig({
//   tanstackStart: {
//     // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
//     // nitro/vite builds from this
//     server: { entry: "server" },
//   },
// });
// import { defineConfig } from "@lovable.dev/vite-tanstack-config";
// import netlify from "@netlify/vite-plugin-tanstack-start";

// const isNetlify = process.env.NETLIFY === "true";

// export default defineConfig({
//   // Render/self-hosted deployment:
//   // Lovable's built-in Nitro remains enabled.

//   // Netlify deployment:
//   // Netlify's TanStack Start plugin handles SSR/functions instead.
//   nitro: isNetlify ? false : undefined,

//   tanstackStart: {
//     server: {
//       entry: "server",
//     },
//   },

//   plugins: isNetlify ? [netlify()] : [],
// });


import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

const isNetlify = process.env["NETLIFY"] === "true";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  vite: {
    plugins: isNetlify ? [netlify()] : [],
  },
});