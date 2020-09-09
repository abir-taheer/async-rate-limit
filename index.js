const async = require('async');

class RateLimit {
	constructor({ limit, timespan }) {
		this.limit = limit || 5;
		this.timespan = timespan || 1000;

		this.queue = async.queue((action, cb) => {
			action().then(() => setTimeout(cb, this.timespan));
		}, this.limit);

		this.perform = this.perform.bind(this);
	}

	perform(action) {
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

module.exports = RateLimit;