Socketify
=========

Take some of the boilerplate out of writing a socket.io application

Write a server-side api with a standard err/result callback :

/messages-api.js :
<pre><code>

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

Connect to a socket.io socket - in this case, a namespaced one

/server.js :
<pre><code>

var socketify = require('socketify');
var api = require(__dirname + './messages-api')();

..

io.of('/messages')..on('connect', function(socket) {
	socketify.listen(api, socket);
});

..
</code></pre>

Include the client-side library, call the api and listen for the response in the same step

/www/index.html :
<pre><code>

<html>
..
<body>
<script type="text/javascript" src="/socket.io/socket.io.js"></script>
<script type="text/javascript" src="js/socketify.js"></script>
<script type="text/javascript">
	
	var socket = Socketify('/example', io).socket;
	socket.on('connect', function() {
	socket.x('message', 'hello socketify', function(err, messages){
		console.log(messages); // ['hello socketify']
	}

</script>
