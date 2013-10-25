var fs = require( "fs" );
var async = require( "async" );
var _ = require( "underscore" );
var S = require( "string" );
var util = require( "util" );

exports.loadAllTransactions = function loadAllTransactions( ){
	fs.readdir( "../transaction",
		function( error, fileList ){
			if( error ){
				console.log( error );
				return;
			}
			if( _.isEmpty( fileList ) ){
				console.log( "Empty transaction engines!" );
				return;
			}
			async.map( fileList,
				function( fileName, callback ){
					var filePath = "../transaction/" + fileName
					fs.stat( filePath,
						function( error, fileStatistic ){
							if( error ){
								console.log( error );
								callback( error );
								return;
							}
							if( fileStatistic.isDirectory( ) ){
								callback( null, filePath );	
							}else{
								callback( );
							}
						} );
				},
				function( error, directoryList ){
					if( error ){
						console.log( error );
						return;
					}
					directoryList = _.compact( directoryList );
					async.map( directoryList,
						function( directoryPath, callback ){
							fs.readdir( directoryPath,
								function( error, fileList ){
									if( error ){
										callback( error )
										return;
									}
									if( _.isEmpty( fileList ) ){
										console.log( "Empty transaction engine at " + directoryPath );
										callback( )
										return;
									}
									async.map( fileList,
										function( fileName, callback ){
											var filePath = directoryPath + "/" + fileName;
											fs.stat( filePath,
												function( error, fileStatistic ){
													if( error ){
														console.log( error );
														callback( error );
													}
													if( fileStatistic.isFile( ) ){
														var transactionName = fileName.replace( /\..+/, "" );
														transactionName = S( transactionName ).camelize( ).toString( );
														var transaction = require( filePath );
														callback( null, {
															"filePath": filePath,
															"transactionName": transactionName,
															"transaction": transaction[ transactionName ]
														} );
													}else{
														callback( );
													}
												} );
										},
										function( error, transactionList ){
											if( error ){
												console.log( error );
												return;
											}
											transactionList = _.compact( transactionList );
											callback( null, {
												"transactionCategory": directoryPath.match( /[-\w]+?$/ )[ 0 ],
												"transactionList": transactionList
											} );
										} );
								} );
						},
						function( error, transactions ){
							if( error ){
								console.log( error );
								return;
							}
							transactions = _.compact( transactions );
								console.log( util.inspect( transactions, { "depth": 5 } ) );
						} );
				} );
		} );
};
//exports.loadAllTransactions = loadAllTransactions;

exports.loadAllRulesets = function loadAllRulesets( ){

};
//exports.loadAllRulesets = loadAllRulesets;

exports.interpolateRules = function interpolateRules( ){

};

exports.generateTransactionNamespace = function generateTransactionNamespace( ){

};


exports.loadAllTransactions( );