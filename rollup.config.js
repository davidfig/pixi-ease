import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default [
{
    input: 'src/ease.js',
    plugins: [
        peerDepsExternal(),
        resolve(
        {
            preferBuiltins: false
        }),
        commonjs(),
        terser()
    ],
    output:
    {
        file: 'dist/ease.js',
        globals:
        {
            'pixi.js': 'PIXI'
        },
        format: 'umd',
        name: 'Ease',
        sourcemap: true
    }
},
{
    input: 'src/ease.js',
    plugins: [
        peerDepsExternal(),
        resolve(
        {
            preferBuiltins: false
        }),
        commonjs()
    ],
    output:
    {
        file: 'dist/ease.es.js',
        format: 'esm',
        sourcemap: true
    }
}]