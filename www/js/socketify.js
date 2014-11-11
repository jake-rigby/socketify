(function (global) {
	'use strict;'

	function Socketify(ns, io) {
		if (this instanceof Socketify) {
			var id = 0,
				callbacks = {},
				apis = {},
				socket = io(ns);
			socket.x = function() {
				try {
					if (typeof arguments[0] !== 'string') throw "api id not defined";
					if (!apis[arguments[0]]) {
						apis[arguments[0]] = true;
						socket.on(arguments[0], function(err, result, cbid) {
							if (typeof callbacks[cbid] === 'function') callbacks[cbid](err, result);
						});
					}
					var cbid = Date.now()+Math.floor(Math.random()*1000000);
					
					if (typeof arguments[arguments.length-1] === 'function') {
						callbacks[cbid] = arguments[arguments.length-1];
						arguments[arguments.length-1] = cbid;					
					} else {
						arguments[arguments.length] = cbid;
						arguments.length++;
					}
					socket.emit.apply(socket,arguments);
				} catch (e) {
					console.log(e)
				}
			}
			return {socket:socket};
		} else return new Socketify(ns, io);
	}
	if (global.angular != null) {
		angular.module('angular-socketify', []).factory('socketify', function() {
			console.log('socketify available');
			return function(ns) {
				return Socketify(ns, io).socket;
			}
		})
	}
	global.Socketify = Socketify;
})(this);
