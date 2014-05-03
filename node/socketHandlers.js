var logger = require("./logger").logger;
var executeDB = require("./database").execute;
var io;

exports.listen = function(server){
    io = require("socket.io").listen(server);
    io.set('log level', 1);
    exports.io = io;
    io.sockets.on('connection', function(socket){
	    executeDB("select display_name from user where id = ?", [1], [socket], sendNews);
	});

    return io;
}

function broadcastMessage(message) {
    logger.log("info", "broadcasting Message to all sockets");
    io.sockets.emit('broadcastMessage', {blogID: message.id, comment: message.comment});
}

function sendNews(params, rows) {
    params[0].emit("news", {name: rows[0].display_name});
}

exports.broadcastMessage = broadcastMessage;