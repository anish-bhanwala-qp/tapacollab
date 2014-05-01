
exports.listen = function(server){
    var io = require("socket.io").listen(server);

    io.sockets.on('connection', function(socket){
	    socket.emit("news", {name: 'anish'});
	});

    return io;
}