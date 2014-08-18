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
				} catch (e) { console.log('[SOCKETIFY]',e,'('+name+')'); }
			})
		})(fname);
	}
}