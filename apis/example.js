module.exports = function() {
	var messages = [];
	return {
		message : function(message, cb) {
			if (message) messages.push(message);
			cb(null, messages);
		}
	}
}