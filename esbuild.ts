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
  plugins: [
    cssModulesPlugin({
      // optional. set to false to not inject generated CSS into <head>, default is true.
      // could be a function with params content & digest (return a string of js code to inject to page),
      // e.g.
      // ```
      // inject: (cssContent, digest) => `console.log("${cssContent}", "${digest}")`
      // ```
      inject: true,

      localsConvention: "dashes", // optional. value could be one of 'camelCaseOnly', 'camelCase', 'dashes', 'dashesOnly', default is 'camelCaseOnly'
      localIdentName: "[local]--[hash:8:md5:hex]",
      cssModulesOption: {
        // optional, refer to: https://github.com/madyankin/postcss-modules/blob/d7cefc427c43bf35f7ebc55e7bda33b4689baf5a/index.d.ts#L27
        // this option will override others passed to postcss-modules
      },

      v2: true, // experimental. v2 can bundle images in css, note if set `v2` to true, all other options will be ignored. and v2 only works with `bundle: true`.
    }),
  ],
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
    outdir: "lib/cjs",
    format: "cjs",
    target: ["node14"],
  })
  .catch(() => process.exit(1));
