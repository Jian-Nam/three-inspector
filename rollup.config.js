import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const isDev = process.env.DEV === "true";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), typescript()],
    external: ["three", "lil-gui"],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      isDev &&
        serve({
          open: true,
          contentBase: ["example", "dist"],
          port: 8080,
        }),
      isDev &&
        livereload({
          watch: ["dist", "example"],
        }),
    ].filter(Boolean),
    external: ["three", "lil-gui"],
  },
];
