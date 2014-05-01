var logger = require("./logger").logger;
var io;

exports.listen = function(server){
    io = require("socket.io").listen(server);
    io.set('log level', 1);
    exports.io = io;
    io.sockets.on('connection', function(socket){
	    socket.emit("news", {name: 'anish'});
	});

    return io;
}

function broadcastMessage(message) {
    logger.log("info", "broadcasting Message to all sockets");
    io.sockets.emit('broadcastMessage', {blogID: message.id, comment: message.comment});
}

exports.broadcastMessage = broadcastMessage;