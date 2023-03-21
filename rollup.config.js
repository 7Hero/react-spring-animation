import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';

export default {
    input: 'src/main.ts',
    output: [
        {
            file: `./dist/cjs/index.js`,
            format: 'cjs',
            sourcemap: true,
            name: 'react-spring-motion'
        },
        {
            file: `./dist/esm/index.js`,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        external(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        terser()
    ]
}