import {defineConfig} from 'rollup'
import dts from 'rollup-plugin-dts';
import babel from '@rollup/plugin-babel'

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      format: "umd",
      file: "dist/index.js",
      name: "netRotation"
    },
    plugins: [
      babel({
        babelHelpers: "bundled",
        extensions: ['.ts'],
      })
    ]
  },
  {
    input: "src/index.ts",
    plugins: [dts()],
    output: {
        format: 'esm',
        file: 'dist/index.d.ts',
    },
  },
])
