import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

export default [
    {
        input: 'docs/code.js',
        plugins: [
            resolve(
            {
                browser: true,
                preferBuiltins: false
            }),
            commonjs(),
            terser()
        ],
        output:
        {
            file: 'docs/index.js',
            format: 'iife',
            sourcemap: true,
            inlineDynamicImports: true
        }
    }
]
