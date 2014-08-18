module.exports = function() {
	var messages = [];
	return {
		message : function(message, cb) {
			console.log(message);
			if (message) messages.push(message);
			cb(null, messages);
		}
	}
}