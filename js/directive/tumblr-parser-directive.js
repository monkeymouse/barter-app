define( [ "barterModule", "jquery" ],
	function( barterModule ){
		barterModule.directive( "tumblrParser",
			function( ){
				console.debug( "Tumblr parser directive loaded!" );
				return {
					"restrict": "E",
					"scope": { },
					"link": function( scope, element ){

					}
				};
			} );
	} );
