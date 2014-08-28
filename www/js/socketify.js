function Socketify(ns, io) {
	if (this instanceof Socketify) {
		var id = 0,
			callbacks = {},
			apis = {},
			socket = io(ns);
		socket.x = function() {
			if (!apis[arguments[0]]) {
				apis[arguments[0]] = true;
				socket.on(arguments[0], function(err, result, cbid) {
					if (typeof callbacks[cbid] === 'function') callbacks[cbid](err, result);
				});
			}
			var cbid = Date.now()+Math.floor(Math.random()*1000000);
			callbacks[cbid] = arguments[arguments.length-1];
			arguments[arguments.length-1] = cbid;
			socket.emit.apply(socket,arguments);
		}
		return {socket:socket};
	} else return new Socketify(ns, io);
}
if (angular != null) {
	angular.module('angular-socketify', []).factory('socketify', function() {
		console.log('socketify available');
		return function(ns) {
			return Socketify(ns, io).socket;
		}
	})
}
