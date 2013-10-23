var http = require( "http" );
var async = require( "async" );
var transactionManager = require( "./node-server/transaction/transaction-manager.js" );
var routerManager = require( "./node-server/barter-router.js" );

var createServer = function createServer( routerEngine, callback ){
	var barterServer = http.createServer( );
	barterServer.on( "request", routerEngine.route );

	barterServer.on( "connect",
		function( ){

		} );

	barterServer.on( "connection",
		function( ){

		} );

	barterServer.on( "clientError",
		function( exception ){
			routerEngine.emit( "error", exception );
		} );

	barterServer.on( "listening",
		function( ){
			routerEngine.emit( "listening" );
		} );

	barterServer.on( "close",
		function( ){
			routerEngine.emit( "close" );
		} );

	callback( null, barterServer );
};

var boot = function boot( ){
	async.waterfall( [
			function( callback ){
				transactionManager.loadAllTransactions( function( error, transactionList ){
					callback( error, transactionList );
				} );
			},
			function( transactionList, callback ){
				transactionManager.loadAllRulesets( function( error, rulesetList ){
					callback( error, transactionList, rulesetList );
				} );
			},
			function( transactionList, rulesetList, callback ){
				transactionManager.interpolateRules( transactionList, rulesetList,
					function( error ){
						callback( error );
					} );
			},
			function( callback ){
				transactionManager.generateTransactionNamespace( function( error, namespaceList ){
					callback( error, namespaceList );
				} );
			},
			function( namespaceList, callback ){
				routerManager.mapTransactions( transactionManager, namespaceList,
					function( error, routerEngine ){
						callback( error, routerEngine );
					} );
			},
			function( routerEngine, callback ){
				createServer( routerEngine, callback );
			}
		],
		function( error, server ){
			if( error ){
				process.exit( );
				return;
			}
			server.listen( 8080 );
		} );
};
exports.boot = boot;

