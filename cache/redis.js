//require redis
const redis = require("redis");

//require bluebird promise library to promisify node_redis
const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//create Redis client
const client = redis.createClient(process.env.REDIS_URL || 6379);


//create cache object
const wrapCache = (obj, ttl) => {
	let wrapped = {};
	for (let funcName in obj) {
		if (obj.hasOwnProperty(funcName)) {
			const func = obj[funcName]
			const wrappedFunc = cacheFunc(funcName, obj[funcName], ttl);
			wrapped[funcName] = wrappedFunc;
		}
	}
	return wrapped;
}


const cacheFunc = (funcName, func, ttl) => {
	return function () {
		const cacheKey = genCacheKey(funcName, arguments);

		return client.getAsync(cacheKey)
			.then(val => {
				if (val !== null) {
					return JSON.parse(val);
				}

				return func.apply(null, arguments)
					.then(res => {
						client.setexAsync(cacheKey, ttl, JSON.stringify(res));
						return res;
					})
			})
	}
}


//generate cache key
const genCacheKey = (funcName, funcArgs) => {
	return JSON.stringify({
		funcName: funcName,
		funcArgs: funcArgs
	});
	
}

module.exports = wrapCache;