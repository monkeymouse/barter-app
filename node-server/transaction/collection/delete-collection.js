var barterDb = require( "../../barter-db.js" );

exports.deleteCollection = function deleteCollection( collectionName, callback ){
	barterDb.countData( collectionName, { "type": "schema" },
		function( error, count ){
			if( error ){
				callback( error );
				return;
			}
			if( count == 1 ){
				barterDb.deleteData( collectionName, { },
					function( error, count ){
						callback( error, count == 1 );
					} );
				//TODO: Fire a delete on collection.
			}else if( count == 0 ){
				callback( null, true );
			}
		} );
};