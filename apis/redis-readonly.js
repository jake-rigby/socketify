module.exports = function(redis) {
	return {
		hget: function(hash, key, cb) {
			redis.hget(hash, key, function(err, result) {
				cb(err, result);
			})
		},
		get: function(key,cb) {
			redis.get(key, function(err, result) {
				cb(err, result);
			})
		}
	}
}
