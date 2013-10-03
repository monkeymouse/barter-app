define( [ "barterModule", "jquery" ],
	function( barterModule ){
		barterModule.directive( "barterApp",
			function( $compile, controllerWrap, safeApply, elementWatcher ){
				console.debug( "Barter application directive loaded!" );
				return {
					"restrict": "E",
					"scope": {
						"accessKey": "=",
						"email": "=",
						"siteUrl": "=",
						"siteName": "="
					},
					"link": function( scope, element ){
						safeApply( scope );
						
						scope.element = element;
						elementWatcher.registerElement( "barter-app", scope, {
							"callback": function( ){
								scope.$on( "dom-change",
									function( ){
										console.log( "Barter app element changes!" );
									} );
							}
						} );

						controllerWrap( element, "BarterAppController",
							function( ){
								$compile( element );
							} );
					}
				};
			} );
	} );