var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var guests = [];


app.get('/',function(req, res){
	res.sendFile(__dirname+'/index.html');
});


io.on('connection', function(socket){
	guests.push(socket.id);
	console.log(guests);
	socket.on('chat.message', function(msg){
		io.emit('chat.message', msg);
	});
});

http.listen(3000, function(){
	console.log('Server listening on :3000');
})