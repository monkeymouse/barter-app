define( [ "barterModule", "jquery" ],
	function( barterModule ){
		barterModule.directive( "tumblrParser",
			function( $compile, controllerWrap, safeApply, elementWatcher ){
				console.debug( "Tumblr parser directive loaded!" );
				return {
					"restrict": "E",
					"scope": { },
					"link": function( scope, element ){
						safeApply( scope );
						
						scope.element = element;
						elementWatcher.registerElement( "tumblr-parser", scope, {
							"callback": function( ){
								scope.$on( "dom-change",
									function( ){
										console.log( "Tumblr parser element changes!" );
									} );
							}
						} );

						controllerWrap( element, "TumblrParserController",
							function( ){
								$compile( element );
							} );
					}
				};
			} );
	} );
