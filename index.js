module.exports.listen = function(api, socket) {
	for (var fname in api) {
		(function(name){
			socket.on(name, function() {
				var id = arguments[arguments.length-1];
				arguments[arguments.length-1] = function(err, result) {
					socket.emit(name, err, result, id);
				}
				try { api[name].apply(api,arguments)
				} catch (e) { console.log('[SOCKETIFY]',e); }
			})
		})(fname);
	}
}