//https://github.com/felixge/node-mysql
var logger = require("./logger").logger;
var mysql = require("mysql");

var pool  = mysql.createPool({
	host     : "localhost",
	user     : "tapacollab_dev",
	password : "anish-shri",
	database : "tapacollab_default"
    });

//query= query string, values= array of values used in query
function execute(query, values, callbackParams, callback) {
    logger.log("info", "Executing query: " +  query);
    pool.getConnection(function(err, connection) {
	    if (err) {
		throw err;
	    }
	    connection.query(query, values, function(err, rows) {
		if (err) {
		    throw err;
		}
		connection.release();
		callback(callbackParams, rows);
	    });
	});
} 

exports.execute = execute;
