import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import builtins from '@joseph184/rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import typescript from 'rollup-plugin-typescript'

export default
{
    input: 'builds/typescript/code.ts',
    plugins: [
        typescript(),
        builtins(),
        resolve(
        {
            preferBuiltins: false,
            browser: true
        }),
        commonjs(
        {
            namedExports:
            {
                'resource-loader': ['Resource']
            }
        }),
        globals()
    ],
    output:
    {
        file: 'builds/typescript/index.js',
        format: 'iife',
        sourcemap: true
    }
}