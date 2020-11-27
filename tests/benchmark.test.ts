import { URL } from 'url'
import { execSync } from 'child_process'
import {} from '../src'
import fs from 'fs'
import path from 'path'
import { timedRun } from './support'

jest.setTimeout(100 * 1000)

const test = process.env.BENCHMARK ? it : it.skip

describe('benchmark', () => {
    const benchDir = path.resolve('tests/bench-files')

    const cases = [
        {
            name: 'esbuild',
            config: path.resolve(benchDir, 'esbuild.config.js'),
        },
        {
            name: 'ts-node',
            config: path.resolve(benchDir, 'ts-jest.config.js'),
        },
    ]

    let messages = []
    afterAll(() => {
        messages.forEach(x => process.stdout.write(x))
    })
    for (let testCase of cases) {
        try {
            execSync('yarn jest -c ${jestConfig} --clearCache', {
                stdio: 'ignore',
            })
        } catch {}
        test(testCase.name, async () => {
            const ms = await timedRun(() =>
                execSync(`yarn jest -c ${testCase.config} ${benchDir}`, {
                    stdio: 'inherit',
                }),
            )
            messages.push(`\n${testCase.name} took ${ms / 1000} seconds\n`)
        })
    }
})
