var http = require( "http" );

var barterServer = http.createServer( );

barterServer.on( "request",
	function( request, response ){
		response.writeHead( 200, {
			"Content-Type": "text/plain"
		} );
		response.end( "Hello World", "utf8" );
	} );

barterServer.listen( 8080 );