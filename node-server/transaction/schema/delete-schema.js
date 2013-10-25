var barterDb = require( "../../barter-db.js" );

exports.deleteSchema = function deleteSchema( collectionName, callback ){
	barterDb.deleteData( "schemaList",
		{ "collectionName": collectionName },
		function( error, result ){
			callback( error, result );
		} );
};