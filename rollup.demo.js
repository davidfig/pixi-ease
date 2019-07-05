import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import builtins from '@joseph184/rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

export default [
    {
        input: 'docs/code.js',
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
            terser()
        ],
        output:
        {
            file: 'docs/index.js',
            format: 'iife',
            sourcemap: true
        }
    },
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
            terser()
        ],
        output:
        {
            file: 'docs/speed/index.js',
            format: 'iife',
            sourcemap: true
        }
    },
]