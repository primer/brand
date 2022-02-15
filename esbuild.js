const esbuild = require("esbuild");

/**
 * ES Modules
 */
esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "lib",
    bundle: true,
    sourcemap: true,
    minify: true,
    splitting: true,
    format: "esm",
    target: ["esnext"],
    legalComments: "none",
  })
  .catch(() => process.exit(1));

/**
 * CommonJS
 */
esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "lib/index.cjs.js",
    bundle: true,
    sourcemap: true,
    minify: true,
    platform: "node",
    format: "cjs",
    target: ["node14"],
    legalComments: "none",
  })
  .catch(() => process.exit(1));
