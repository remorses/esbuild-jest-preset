import fs from 'fs'
import path from 'path'
import strip from 'strip-json-comments'

export const getOptions = (
    cwd?: string,
): { jsxFactory?: string; jsxFragment?: string; target?: string } => {
    cwd = cwd || process.cwd()
    const tsconfig = path.resolve(cwd, 'tsconfig.json')
    if (fs.existsSync(tsconfig)) {
        const data = JSON.parse(
            strip(fs.readFileSync(tsconfig).toString() || 'null'),
        )
        if (data) {
            return {
                jsxFactory: data.compilerOptions?.jsxFactory,
                jsxFragment: data.compilerOptions?.jsxFragmentFactory,
                target: data.compilerOptions?.target,
            }
        }
    }
}
