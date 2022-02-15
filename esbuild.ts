const esbuild = require("esbuild");
const cssModulesPlugin = require("esbuild-css-modules-plugin");
const path = require("path");

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  sourcemap: true,
  minify: true,
  legalComments: "none",
  tsconfig: "tsconfig.build.json",
};

/**
 * ES Modules
 */
esbuild
  .build({
    ...sharedConfig,
    outdir: "lib",
    splitting: true,
    format: "esm",
    target: ["esnext"],
    plugins: [
      cssModulesPlugin({
        inject: true,
      }),
    ],
  })
  .catch(() => process.exit(1));

/**
 * CommonJS
 */
esbuild
  .build({
    ...sharedConfig,
    outdir: "lib/cjs",
    format: "cjs",
    target: ["esnext"],
    plugins: [
      cssModulesPlugin({
        v2: true,
      }),
    ],
  })
  .catch(() => process.exit(1));
