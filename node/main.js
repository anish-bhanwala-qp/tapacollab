var server = require("./server");
var requestHandlers = require("./requestHandlers");
var handlers = {};

handlers["/"] = requestHandlers.staticContent;
handlers["/socket.io.min.js"] = requestHandlers.staticContent;
handlers["/start"] = requestHandlers.start;
handlers["/upload"] = requestHandlers.upload;

server.start(handlers);
