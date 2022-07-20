import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import babel from '@rollup/plugin-babel'
import resolve, { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
// import nodePolyfills from 'rollup-plugin-node-polyfills'
export default {
  input: 'src/index.js',
  output: {
    file: 'public/dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    // nodePolyfills(),

    commonjs(),
    // nodeResolve({
    //   preferBuiltins: false,
    // }),
    resolve({ browser: true, preferBuiltins: false }),
    serve({
      open: false,
      verbose: true,
      contentBase: ['', 'public'],
      host: 'localhost',
      port: 3000,
    }),
    livereload({ watch: 'public/dist' }),
  ],
}
