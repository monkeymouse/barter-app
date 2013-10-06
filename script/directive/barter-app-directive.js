define( [ "barterModule", "jquery" ],
	function( barterModule ){
		barterModule.directive( "barterApp",
			function( $compile, controllerWrap, safeApply, elementWatcher, elementPropertyWatcher ){
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
									function( event, element ){
										console.debug( "Change element: ", element );
										console.log( "Barter app element changes!" );
									} );
							}
						} );

						elementPropertyWatcher( "barter-app", scope, [ "sample-attr" ], 
							{
								"callback": function( ){
									scope.$on( "dom-change:sample-attr",
										function( event, sampleAttr ){
											console.debug( "Change sample attr: ", sampleAttr );
											console.log( "Barter app sample attr property of element changes!" );
										} );
								}
							} );

						elementPropertyWatcher( "barter-app", scope, [ "sample-attr2" ], 
							{
								"callback": function( ){
									scope.$on( "dom-change:sample-attr2",
										function( event, sampleAttr2 ){
											console.debug( "Change sample attr2: ", sampleAttr2 );
											console.log( "Barter app sample attr2 property of element changes!" );
										} );
								}
							} );

						controllerWrap( element, "BarterAppController",
							function( ){
								$compile( element );
							} );

						setTimeout( function( ){
							scope.element.attr( "sample-attr", "Hello World" );
						}, 1000 );

						setTimeout( function( ){
							scope.element.attr( "sample-attr", "" );
						}, 1500 );

						setTimeout( function( ){
							elementWatcher.deactivateWatcher( );
						}, 3000 );
					}
				};
			} );
	} );