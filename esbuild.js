const esbuild = require("esbuild");

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
  })
  .catch(() => process.exit(1));

/**
 * CommonJS
 */
esbuild
  .build({
    ...sharedConfig,
    outfile: "lib/index.cjs.js",
    format: "cjs",
    target: ["node14"],
  })
  .catch(() => process.exit(1));
