import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from '@rollup/plugin-typescript'
import json from 'rollup-plugin-json'
import babel from '@rollup/plugin-babel'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

const pkg = require('./package.json')

const libraryName = camelCase(pkg.name)

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: libraryName, format: 'umd', sourcemap: true }, // 通用模块定义，以amd，cjs和iife为一体
    { file: pkg.module, format: 'es', sourcemap: true } // ES模块文件
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      babelHelpers: 'bundled' // 开启体积优化
    }),

    terser(),

    filesize(),

    // Resolve source maps to the original source
    sourceMaps()
  ]
}
