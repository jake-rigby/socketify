module.exports.listen = function(api, socket) {
	for (var fname in api) {
		(function(name){
			socket.on(name, function() {
				try { 
					if (!api[name]) 
						throw 'method not found';
					if (api[name].length!=arguments.length) 
						throw 'incorrect number of arguments (got'+(arguments.length-1)+', wanted'+api[name].length+')';
					var id = arguments[arguments.length-1];
					arguments[arguments.length-1] = function(err, result) {
						socket.emit(name, err, result, id);
					}
					api[name].apply(api,arguments)
				} catch (e) {
					arguments[arguments.length-1] = function(err, result) {
						socket.emit(name, e, null, id);
					}
					console.log('[SOCKETIFY]',e,'('+name+')'); 
				}
			})
		})(fname);
	}
}
module.exports.public = function() {
	return require('path').normalize(__dirname+'/www');
}
module.exports.apis = {
	example: require('./apis/example')(),
	redis: require('./apis/redis'),
	redis_readonly: require('./apis/redis_readonly')
}