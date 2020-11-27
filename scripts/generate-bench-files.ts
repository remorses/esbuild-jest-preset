import fs from 'fs'
import path from 'path'

async function main() {
    const outDir = path.resolve('tests/bench-files')
    Array.from({ length: 200 })
        .fill(0)
        .forEach((_, i) => {
            const outFile = path.resolve(outDir, `${i}.test.ts`)
            fs.writeFileSync(outFile, exampleTestCode(i))
        })
}
main()

function exampleTestCode(i) {
    return `test('bench test ${i}', () => {})`
}
