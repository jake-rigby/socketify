module.exports = {
	apiMethod1 : function(message, param, cb) {
		cb(null, {message:'api method 1 received:'+message});
	},
	apiMethod2 : function(message1, cb) {
		cb(null, ['api method 2 received',message1]);
	}
}