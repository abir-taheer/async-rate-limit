declare module "async-rate-limit" {
    const RateLimit: {
        constructor: ({limit: number, timespan: number})
        perform(action: Function): Promise<any>
    }
}
