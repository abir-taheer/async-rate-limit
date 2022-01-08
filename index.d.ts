declare class RateLimit{
    constructor(limit: number, timespan: number)
    perform(action: Function): Promise<any>
}

declare module "async-rate-limit" {
    export = RateLimit;
}
  