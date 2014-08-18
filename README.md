Socketify
=========

forward a server-side async-style api to a remote socket.io client

1. Write a server-side api with a standard err/result callback :

<pre><code>
/messages-api.js

module.exports = function() {
	var messages = [];
	return {
		message : function(message, cb) {
			if (message) messages.push(message);
			cb(null, messages);
		}
	}
}
</pre></code>

2. Connect to a socket.io socket - in this case, a namespaced one :

<pre><code>
/server.js

var socketify = require('socketify');
var api = require(__dirname + './messages-api')();

..

io.of('/messages')..on('connect', function(socket) {
	socketify.listen(api, socket);
});

..
</code></pre>
