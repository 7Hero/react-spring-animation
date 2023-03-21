import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

const config = [
    {
        input: 'src/main.ts',
        output: [
            {
                file: `./dist/index.js`,
                format: 'esm',
                sourcemap: true,
                name: 'react-spring-motion'
            },
        ],
        plugins: [
            external(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            terser()
        ]
    },
    {
        input: './dist/dts/main.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
    }
]

export default config;
