var fs = require('fs');


module.exports.listen = function(api, ns, io) {

	io.of(ns).on('connection',function(socket) {

	for (var fname in api) {
		(function(name){
			socket.on(name, function() {
				console.log('listener triggered', name);
				var id = arguments[arguments.length-1];
				arguments[arguments.length-1] = function(err, result) {
					socket.emit(name, err, result, id);
				}
				try { api[name].apply(api,arguments)
				} catch (e) { console.log('[SOCKETIFY]',e); }
			})
		})(fname);
	}

	});
}