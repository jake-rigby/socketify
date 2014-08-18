module.exports = function(redis) {
	return {
		hget: function(hash, key, cb) {
			redis.hget(hash, key, cb);
		},
		hset: function(hash, key, value, cb) {
			redis.hset(hash, key, value, cb);
		},
		get: function(key, cb) {
			redis.get(key, cb);
		},
		set: function(key, value, cb) {
			redis.set(key, value, cb);
		}
	}
}
