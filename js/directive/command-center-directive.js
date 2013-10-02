define( [ "barterModule", "jquery" ],
	function( barterModule ){
		barterModule.directive( "commandCenter",
			function( ){
				console.debug( "Command center directive loaded!" );
				return {
					"restrict": "E",
					"scope": {
						"accessKey": "=?",
						"email": "=?",
						"siteUrl": "=?",
						"siteName": "=?"
					},
					"link": function( scope, element ){

					}
				};
			} );
	} );