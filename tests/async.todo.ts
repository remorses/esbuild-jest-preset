// import { Service, startService } from 'esbuild'
// import { getOptions } from './options'
// import { getLoader } from './support'

// let service: Service | Promise<Service> = startService({})

// let timerId = setTimeout(async () => {
//     let readyService = await service
//     readyService.stop()
// }, 100)

// async function processFiles(content: string, filename: string) {
//     clearInterval(timerId)
//     let readyService = service ? await service : await startService()
//     service = readyService
//     const options = getOptions()
//     console.log('processing')
//     const result = await readyService.transform(content, {
//         loader: getLoader(filename),
//         sourcefile: filename,
//         ...options,
//         format: 'cjs',
//         target: 'es2018',
//         sourcemap: true,
//     })

//     timerId = setTimeout(() => {
//         console.log('stopping')
//         readyService.stop()
//     }, 100)
//     return {
//         code: result.code,
//         map: {
//             ...JSON.parse(result.map),
//             sourcesContent: null,
//         },
//     }
// }

// export { processFiles as process }
