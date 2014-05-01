var logger = require('winston');

//Use log files
logger.add(logger.transports.File, { filename: './logs/nodeJSLogs.log', maxsize: 1024 });
//remove deault console logging
//winston.remove(winston.transports.Console);

exports.logger = logger;