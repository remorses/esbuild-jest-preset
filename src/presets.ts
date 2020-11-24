import type { Config } from '@jest/types'

export type TsJestPresets = Pick<
    Config.InitialOptions,
    'moduleFileExtensions' | 'transform' | 'testMatch'
>

export function createJestPreset(
    from: Config.InitialOptions = {},
): TsJestPresets {
    // console.log({ from })
    return {
        transform: {
            ...from.transform,
            ['^.+\\.[tj]sx?$']: require.resolve('../dist/index.js'),
        },
        ...(from.testMatch ? { testMatch: from.testMatch } : undefined),
        ...(from.moduleFileExtensions
            ? { moduleFileExtensions: from.moduleFileExtensions }
            : undefined),
    }
}
