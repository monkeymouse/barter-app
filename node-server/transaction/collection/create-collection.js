var barterDb = require( "../../../barter-db.js" );

exports.createCollection = function createCollection( collectionName, schema, callback ){
	barterDb.countData( collectionName, { "type": "schema" },
		function( error, count ){
			if( error ){
				callback( error );
				return;
			}
			if( count == 1 ){
				callback( null, true );
			}else if( count == 0 ){
				barterDb.saveData( collectionName, 
					{ "type": "schema" }, schema,
					function( error, count ){
						callback( error, count == 1 );
					} );
			}
		} );
};