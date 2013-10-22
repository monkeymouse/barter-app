var MongoClient = require( "mongodb" ).MongoClient;
var async = require( "async" );
var util = require( "util" );
var EventEmitter = require( "events" ).EventEmitter;

var connectionOptions;
exports.setConnectionOptions = function setConnectionOptions( options ){
	connectionOptions = options;
};

var connectionString;
exports.setConnectionString = function setConnectionString( string ){
	connectionString = string;
};

var currentDb;
exports.connect = function connect( callback ){
	if( currentDb ){
		callback( null, currentDb );
		return;
	}
	
	//TODO: Remove this string on production.
	connectionString = "mongodb://admin:qfacqLJeA47t@127.0.0.1:27017/databank";
	
	MongoClient.connect( connectionString,
		connectionOptions || { },
		function( error, db ){
			if( error ){
				callback( error );
			}else{
				currentDb = db;
				callback( null, db );
			}
		} );
};

var collectionList = [ ];
var accessCollection = function accessCollection( collectionName, callback ){
	async.each( collectionList,
		function( collectionData, callback ){
			if( collectionData.status != "ok" ){
				currentDb.collection( collectionData.name,
					function( error, collection ){
						if( !error ){
							collectionData.collection = collection;
							if( collectionData.name == collectionName ){
								callback( collectionData );	
							}
						}else{
							callback( );
						}
					} );
				return;
			}
			if( collectionData.name == collectionName ){
				callback( collectionData );
				return;
			}
			callback( );
		},
		function( collectionData ){
			if( collectionData ){
				callback( null, collectionData.collection );
			}
			currentDb.collection( collectionName,
				function( error, collection ){
					if( error ){
						callback( error );
					}else{
						collectionList.push( {
							"db": currentDb,
							"name": collectionName,
							"collection": collection,
							"status": "ok"
						} );
						callback( null, collection );
					}
				} );
		} );
};
exports.accessCollection = accessCollection;

var countData = function countData( collectionName, query, callback ){
	accessCollection( collectionName,
		function( error, collection ){
			if( error ){
				callback( error );
				return;	
			}
			collection.count( query,
				function( error, count ){
					if( error ){

					}
					callback( error, count );
				} );
		} );
};
exports.countData = countData;

exports.saveData = function saveData( collectionName, query, data, callback ){
	accessCollection( collectionName,
		function( error, collection ){
			if( error ){
				callback( error );
				return;	
			}
			collection.update( query, data,
				{ "w": 1, "upsert": true, "multi": true },
				function( error, updateCount ){
					if( error ){

					}
					callback( error, updateCount );
				} );
		} );
};

exports.deleteData = function deleteData( collectionName, query, callback ){
	accessCollection( collectionName,
		function( error, collection ){
			if( error ){
				callback( error );
				return;	
			}
			collection.remove( query, { "w": 1 },
				function( error, removeCount ){
					if( error ){

					}
					callback( error, removeCount );
				} );
		} );
};

exports.getData = function getData( collectionName, query, options, callback ){
	accessCollection( collectionName,
		function( error, collection ){
			if( error ){
				callback( error );
				return;	
			}
			collection.find( query, options || { },
				function( error, result ){
					if( error ){

					}
					callback( error, result );
				} );
		} );
};
