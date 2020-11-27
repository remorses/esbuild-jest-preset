import { URL } from 'url'
import { execSync } from 'child_process'
import {} from '../src'
import fs from 'fs'
import path from 'path'
import { timedRun } from './support'

jest.setTimeout(100 * 1000)

const test = process.env.BENCHMARK ? it : it.skip

test('benchmark', async () => {
    const benchDir = path.resolve('tests/bench-files')
    const jestConfig = path.resolve(benchDir, 'jest.config.js')
    try {
        execSync('yarn jest -c ${jestConfig} --clearCache')
    } catch {}
    const ms = await timedRun(() =>
        execSync(`yarn jest -c ${jestConfig} ${benchDir}`, {
            stdio: 'inherit',
        }),
    )

    process.stdout.write(`\n\ntook ${ms / 1000} seconds\n\n`)
})
