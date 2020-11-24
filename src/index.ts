import { transformSync } from 'esbuild'
import { getOptions } from './options'
import { getLoader } from './support'


// TODO when is async process available? we are spawning processes here
export function process(content: string, filename: string) {
    const options = getOptions()

    const result = transformSync(content, {
        loader: getLoader(filename),
        sourcefile: filename,
        ...options,
        format: 'cjs',
        target: 'es2018',
        sourcemap: true,
    })

    return {
        code: result.code,
        map: {
            ...JSON.parse(result.map),
            sourcesContent: null,
        },
    }
}
