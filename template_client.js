(function(){
	function api(socket){
		this.socket = socket;
		callbacks = {};
	}
	api.prototype.apiMethod1 = function(cb) {
		var id = uid();
		this.callbacks[id] = cb;
		this.socket.emit.apply(socket,['apiMethod'].concat(arguments.concat([id])));
		socket.on('apiMethod1', function() {
			try { get(arguments.pop()).apply(arguments) } catch (e) { console.log(e) }
		})
	}
	function uid() {
		return Date.now()+Math.floor(Math.random()*1000000);
	}
})()