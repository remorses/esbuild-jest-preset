import { Loader, transformSync } from 'esbuild'
import { extname } from 'path'
import { getOptions } from './options'
import { getLoader } from './support'

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
