import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import serve from 'rollup-plugin-serve'

export default
{
    input: 'docs/code.js',
    plugins: [
        resolve(
        {
            browser: true,
            preferBuiltins: false
        }),
        commonjs(),
        serve(
        {
            contentBase: 'docs',
            port: 10001,
            verbose: true
        })
    ],
    output:
    {
        name: 'Ease',
        file: 'docs/index.js',
        format: 'iife',
        sourcemap: true,
        inlineDynamicImports: true
    }
}
