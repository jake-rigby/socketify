Socketify
=========

Take some of the boilerplate out of writing a socket.io application

*why?*

Write the pure server-side api without thinking about socket.io syntax. Don't worry about tracking multiple callbacks from the same api client-side. Organise apis around namespaces. Don't stop writing your normal socket.io events on the same socket if you wish.

*how?*

Write a server-side api with a standard err/result callback :

/messages-api.js :

    module.exports = function() {
    	var messages = [];
    	return {
    		message : function(message, cb) {
    			if (message) messages.push(message);
    			cb(null, messages);
    		}
    	}
    }


Connect to a socket.io socket - in this case, a namespaced one :

/server.js :

    var socketify = require('socketify');
    var api = require(__dirname + './messages-api')();

    io.of('/messages')..on('connect', function(socket) {
    	socketify.listen(api, socket);
    });

Include the client-side library, call the api and listen for the response in the same step

/www/index.html :

    var socket = Socketify('/example', io).socket;
    socket.on('connect', function() {
    socket.x('message', 'hello socketify', function(err, messages){
    	console.log(messages); // ['hello socketify']
    }
