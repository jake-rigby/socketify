var express = require('express'),
	http = require('http'),
	socketio = require('socket.io'),
	socketify = require('../index'),
	app = express(),
	server = http.createServer(app),
	io = socketio.listen(server),
	config = {redis:require('./config/redis')},
	redis = require('redis').createClient(config.redis.port, config.redis.host, {no_ready_check: true});;

app.use(express.static(__dirname + '/www'));

socketify.listen(require('./example.simple'), '/example.simple', io);
socketify.listen(require('./example.redis-readonly')(redis), '/example.redis-readonly', io);

server.listen(1134);