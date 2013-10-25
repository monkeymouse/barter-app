var barterDb = require( "../../barter-db.js" );

exports.addSchema = function addSchema( collectionName, callback ){
	barterDb.getData( collectionName,
		{ "type": "schema" }, null,
		function( error, schema ){
			if( error ){
				callback( error );
				return;
			}
			barterDb.hasData( "schemaList",
				{ "collectionName": collectionName },
				function( error, isExisting ){
					if( error ){
						callback( error );
						return;
					}
					if( !isExisting ){
						barterDb.saveData( "schemaList",
							{ "collectionName": collectionName }, schema,
							function( error, result ){
								callback( error, result );
							} );
					}else{
						callback( null, isExisting );
					}
				} );
			
		} );
};