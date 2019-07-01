import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import serve from 'rollup-plugin-serve'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

export default
{
    input: 'docs/speed/code.js',
    plugins: [
        builtins(),
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
        globals(),
        serve(
        {
            contentBase: 'docs/speed',
            verbose: true
        })
    ],
    output:
    {
        name: 'Ease',
        file: 'docs/speed/index.js',
        format: 'iife',
        sourcemap: true
    }
}