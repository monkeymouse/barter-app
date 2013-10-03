define( [ "barterModule", "jquery" ],
	function( barterModule ){
		barterModule.directive( "barterApp",
			function( $compile, controllerWrap ){
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
						scope.element = element;

						controllerWrap( element, "BarterAppController",
							function( ){
								$compile( element );
							} );

						scope.$watch( "element",
							function( newValue ){
								if( newValue ){
									console.debug( "Element changes!", element );	
								}
							} );
					}
				};
			} );
	} );