var express = require('express'),
	http = require('http'),
	socketio = require('socket.io'),
	socketify = require('../index'),
	app = express(),
	server = http.createServer(app),
	io = socketio.listen(server),
	config = {redis:require('./config/redis')},
	redis = require('redis').createClient(config.redis.port, config.redis.host, {no_ready_check: true});

app.use(express.static(__dirname + './../www'));
app.use(express.static(__dirname + '/www'));

io.of('/example').on('connect', function(socket) {
	socketify.listen(socketify.apis.example, socket);
})

io.of('/redis').on('connect', function(socket) {
	socketify.listen(socketify.apis.redis(redis), socket);
})

server.listen(1134);