define( [ "barterModule", "jquery" ],
	function( barterModule ){
		barterModule.directive( "barterApp",
			function( ){
				console.debug( "Barter application directive loaded!" );
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