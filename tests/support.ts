export async function timedRun(func) {
    const start = process.hrtime.bigint()
    await func()
    const end = process.hrtime.bigint()
    return Math.round(Number(end - start) / 1e6)
}
