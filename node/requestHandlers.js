var querystring = require("querystring");
var logger = require("./logger").logger;
var fs = require("fs");
var url = require("url");
var socketHandlers = require("./socketHandlers");

function start(request, response, postData) {
    logger.log("Request handler 'start' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text");
    response.end();
}

function upload(request, response, postData) {
    logger.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text: " +
		   querystring.parse(postData).text);
    response.end();
}

function broadcastMessage(request, response, postData) {
    logger.log("info", "inside requesthandler broadcastMessge. Method: " + request.method);
    logger.log("info", "post data received:" + postData);
    if (postData && querystring.parse(postData).text) {
	var message = JSON.parse(querystring.parse(postData).text);
	socketHandlers.broadcastMessage(message);
    }
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("message broadcast successfull");
    response.end();
}

function extname (path) {
    var index = path.lastIndexOf(".");
    return index < 0 ? "" : path.substring(index);
}

function staticContent(request, response, postData) {
    var body, headers;
    var filename = url.parse(request.url).pathname;
    logger.log("info", "logging filename: " + filename);
    if ("/".localeCompare(filename) == 0) {
	filename = "index.html";
    }
    logger.log("info", "logging filename: " + filename);
    var content_type = lookupExtension(extname(filename));

	logger.log("loading " + filename + "...");
	fs.readFile(filename, function (err, data) {
		if (err) {
		    response.writeHead(404, {"Content-Type": "text/plain"});
		    response.write("404 Not found");
		    response.end();
		} else {
		    body = data;
		    headers = { "Content-Type": content_type
				, "Content-Length": body.length
		    };
		    response.writeHead(200, headers);
		    response.end(request.method === "HEAD" ? "" : body);
		}
	    });
}

function lookupExtension(ext, fallback) {
    return TYPES[ext.toLowerCase()] || fallback || 'application/octet-stream';
}

var TYPES = { ".3gp"   : "video/3gpp"
	, ".a"     : "application/octet-stream"
	, ".ai"    : "application/postscript"
	, ".aif"   : "audio/x-aiff"
	, ".aiff"  : "audio/x-aiff"
	, ".asc"   : "application/pgp-signature"
	, ".asf"   : "video/x-ms-asf"
	, ".asm"   : "text/x-asm"
	, ".asx"   : "video/x-ms-asf"
	, ".atom"  : "application/atom+xml"
	, ".au"    : "audio/basic"
	, ".avi"   : "video/x-msvideo"
	, ".bat"   : "application/x-msdownload"
	, ".bin"   : "application/octet-stream"
	, ".bmp"   : "image/bmp"
	, ".bz2"   : "application/x-bzip2"
	, ".c"     : "text/x-c"
	, ".cab"   : "application/vnd.ms-cab-compressed"
	, ".cc"    : "text/x-c"
	, ".chm"   : "application/vnd.ms-htmlhelp"
	, ".class"   : "application/octet-stream"
	, ".com"   : "application/x-msdownload"
	, ".conf"  : "text/plain"
	, ".cpp"   : "text/x-c"
	, ".crt"   : "application/x-x509-ca-cert"
	, ".css"   : "text/css"
	, ".csv"   : "text/csv"
	, ".cxx"   : "text/x-c"
	, ".deb"   : "application/x-debian-package"
	, ".der"   : "application/x-x509-ca-cert"
	, ".diff"  : "text/x-diff"
	, ".djv"   : "image/vnd.djvu"
	, ".djvu"  : "image/vnd.djvu"
	, ".dll"   : "application/x-msdownload"
	, ".dmg"   : "application/octet-stream"
	, ".doc"   : "application/msword"
	, ".dot"   : "application/msword"
	, ".dtd"   : "application/xml-dtd"
	, ".dvi"   : "application/x-dvi"
	, ".ear"   : "application/java-archive"
	, ".eml"   : "message/rfc822"
	, ".eps"   : "application/postscript"
	, ".exe"   : "application/x-msdownload"
	, ".f"     : "text/x-fortran"
	, ".f77"   : "text/x-fortran"
	, ".f90"   : "text/x-fortran"
	, ".flv"   : "video/x-flv"
	, ".for"   : "text/x-fortran"
	, ".gem"   : "application/octet-stream"
	, ".gemspec" : "text/x-script.ruby"
	, ".gif"   : "image/gif"
	, ".gz"    : "application/x-gzip"
	, ".h"     : "text/x-c"
	, ".hh"    : "text/x-c"
	, ".htm"   : "text/html"
	, ".html"  : "text/html"
	, ".ico"   : "image/vnd.microsoft.icon"
	, ".ics"   : "text/calendar"
	, ".ifb"   : "text/calendar"
	, ".iso"   : "application/octet-stream"
	, ".jar"   : "application/java-archive"
	, ".java"  : "text/x-java-source"
	, ".jnlp"  : "application/x-java-jnlp-file"
	, ".jpeg"  : "image/jpeg"
	, ".jpg"   : "image/jpeg"
	, ".js"    : "application/javascript"
	, ".json"  : "application/json"
	, ".log"   : "text/plain"
	, ".m3u"   : "audio/x-mpegurl"
	, ".m4v"   : "video/mp4"
	, ".man"   : "text/troff"
	, ".mathml"  : "application/mathml+xml"
	, ".mbox"  : "application/mbox"
	, ".mdoc"  : "text/troff"
	, ".me"    : "text/troff"
	, ".mid"   : "audio/midi"
	, ".midi"  : "audio/midi"
	, ".mime"  : "message/rfc822"
	, ".mml"   : "application/mathml+xml"
	, ".mng"   : "video/x-mng"
	, ".mov"   : "video/quicktime"
	, ".mp3"   : "audio/mpeg"
	, ".mp4"   : "video/mp4"
	, ".mp4v"  : "video/mp4"
	, ".mpeg"  : "video/mpeg"
	, ".mpg"   : "video/mpeg"
	, ".ms"    : "text/troff"
	, ".msi"   : "application/x-msdownload"
	, ".odp"   : "application/vnd.oasis.opendocument.presentation"
	, ".ods"   : "application/vnd.oasis.opendocument.spreadsheet"
	, ".odt"   : "application/vnd.oasis.opendocument.text"
	, ".ogg"   : "application/ogg"
	, ".p"     : "text/x-pascal"
	, ".pas"   : "text/x-pascal"
	, ".pbm"   : "image/x-portable-bitmap"
	, ".pdf"   : "application/pdf"
	, ".pem"   : "application/x-x509-ca-cert"
	, ".pgm"   : "image/x-portable-graymap"
	, ".pgp"   : "application/pgp-encrypted"
	, ".pkg"   : "application/octet-stream"
	, ".pl"    : "text/x-script.perl"
	, ".pm"    : "text/x-script.perl-module"
	, ".png"   : "image/png"
	, ".pnm"   : "image/x-portable-anymap"
	, ".ppm"   : "image/x-portable-pixmap"
	, ".pps"   : "application/vnd.ms-powerpoint"
	, ".ppt"   : "application/vnd.ms-powerpoint"
	, ".ps"    : "application/postscript"
	, ".psd"   : "image/vnd.adobe.photoshop"
	, ".py"    : "text/x-script.python"
	, ".qt"    : "video/quicktime"
	, ".ra"    : "audio/x-pn-realaudio"
	, ".rake"  : "text/x-script.ruby"
	, ".ram"   : "audio/x-pn-realaudio"
	, ".rar"   : "application/x-rar-compressed"
	, ".rb"    : "text/x-script.ruby"
	, ".rdf"   : "application/rdf+xml"
	, ".roff"  : "text/troff"
	, ".rpm"   : "application/x-redhat-package-manager"
	, ".rss"   : "application/rss+xml"
	, ".rtf"   : "application/rtf"
	, ".ru"    : "text/x-script.ruby"
	, ".s"     : "text/x-asm"
	, ".sgm"   : "text/sgml"
	, ".sgml"  : "text/sgml"
	, ".sh"    : "application/x-sh"
	, ".sig"   : "application/pgp-signature"
	, ".snd"   : "audio/basic"
	, ".so"    : "application/octet-stream"
	, ".svg"   : "image/svg+xml"
	, ".svgz"  : "image/svg+xml"
	, ".swf"   : "application/x-shockwave-flash"
	, ".t"     : "text/troff"
	, ".tar"   : "application/x-tar"
	, ".tbz"   : "application/x-bzip-compressed-tar"
	, ".tcl"   : "application/x-tcl"
	, ".tex"   : "application/x-tex"
	, ".texi"  : "application/x-texinfo"
	, ".texinfo" : "application/x-texinfo"
	, ".text"  : "text/plain"
	, ".tif"   : "image/tiff"
	, ".tiff"  : "image/tiff"
	, ".torrent" : "application/x-bittorrent"
	, ".tr"    : "text/troff"
	, ".txt"   : "text/plain"
	, ".vcf"   : "text/x-vcard"
	, ".xslt"  : "application/xslt+xml"
	, ".yaml"  : "text/yaml"
	, ".yml"   : "text/yaml"
	, ".zip"   : "application/zip"
}


exports.start = start;
exports.upload = upload;
exports.staticContent = staticContent;
exports.broadcastMessage = broadcastMessage;