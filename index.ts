const { queue } = require("async");

interface Props {
  limit?: number;
  timespan?: number;
}

class RateLimit {
  private readonly limit: number;
  private readonly timespan: number;
  private queue: any;
  static default: any;

  constructor({ limit, timespan }: Props) {
    this.limit = limit || 5;
    this.timespan = timespan || 1000;

    this.queue = queue((action: Function, cb: Function) => {
      action().then(() => setTimeout(cb, this.timespan));
    }, this.limit);

    this.perform = this.perform.bind(this);
  }

  perform(action: Function): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await action();
          resolve(result);
        } catch (er) {
          reject(er);
        }
      });
    });
  }
}

RateLimit.default = RateLimit;
export = RateLimit;