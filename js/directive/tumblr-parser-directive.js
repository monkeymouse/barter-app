define( [ "barterModule", "jquery" ],
	function( barterModule ){
		barterModule.directive( "tumblrParser",
			function( $compile, controllerWrap ){
				console.debug( "Tumblr parser directive loaded!" );
				return {
					"restrict": "E",
					"scope": { },
					"link": function( scope, element ){
						controllerWrap( element, "TumblrParserController",
							function( ){
								$compile( element );
							} );
					}
				};
			} );
	} );
