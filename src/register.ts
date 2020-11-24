import path, { dirname, extname } from 'path'
import type { RawSourceMap } from 'source-map'
import sourceMapSupport from 'source-map-support'
import { transformSync } from 'esbuild'
import { addHook } from 'pirates'
import { getOptions } from './options'
import { DEFAULT_EXTENSIONS, getLoader } from './support'

const map: { [file: string]: string | RawSourceMap } = {}

function installSourceMapSupport() {
    sourceMapSupport.install({
        handleUncaughtExceptions: false,
        environment: 'node',
        retrieveSourceMap(file) {
            if (map[file]) {
                return {
                    url: file,
                    map: map[file],
                }
            }
            return null
        },
    })
}

function createCompile({}) {
    function compile(code: string, filename: string) {
        const options = getOptions()
        const { code: js, warnings, map: jsSourceMap } = transformSync(code, {
            sourcefile: filename,
            sourcemap: true,
            format: 'cjs',
            loader: getLoader(filename),
            target: options.target,
            jsxFactory: options.jsxFactory,
            jsxFragment: options.jsxFragment,
        })
        map[filename] = jsSourceMap
        if (warnings && warnings.length > 0) {
            for (const warning of warnings) {
                // console.log(warning.location)
                console.log(
                    warning.text,
                    `, at '${path.relative(
                        process.cwd(),
                        warning.location.file,
                    )}' line ${warning.location.line}`,
                )
            }
        }
        return js
    }
    return compile
}

export function register({ ignoreNodeModules = true, ...opts } = {}) {
    installSourceMapSupport()
    addHook(createCompile(opts), {
        exts: DEFAULT_EXTENSIONS,
        ignoreNodeModules,
    })
}
