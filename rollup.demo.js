import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default
{
    input: 'docs/code.js',
    plugins: [
        resolve(
        {
            browser: true,
            preferBuiltins: false
        }),
        commonjs(
        {
            namedExports:
            {
                'resource-loader': ['Resource']
            }
        }),
        terser(),
    ],
    output:
    {
        name: 'demo',
        file: 'docs/index.js',
        format: 'iife',
        sourcemap: true
    }
}