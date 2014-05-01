var logger = require('winston');

//Use log files, 524288000 = 500 MB
logger.add(logger.transports.File, { filename: './logs/nodeJSLogs.log', maxsize: 524288000 });
//remove deault console logging
//winston.remove(winston.transports.Console);

exports.logger = logger;