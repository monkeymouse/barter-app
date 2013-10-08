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

						elementPropertyWatcher( "barter-app", scope, [ "sample-attr", "sample-attr2", "this-attr", "offsetWidth" ], 
							{
								"callback": function( ){
									scope.$on( "dom-change:sample-attr",
										function( event, sampleAttr ){
											console.debug( "Change sample attr: ", sampleAttr );
											console.log( "Barter app sample attr property of element changes!" );
										} );

									scope.$on( "dom-change:sample-attr2",
										function( event, sampleAttr2 ){
											console.debug( "Change sample attr2: ", sampleAttr2 );
											console.log( "Barter app sample attr2 property of element changes!" );
										} );

									scope.$on( "dom-change:this-attr",
										function( event, thisAttr ){
											console.debug( "Change this attr: ", thisAttr );
											console.log( "Barter app this attr property of element changes!" );
										} );

									scope.$on( "dom-change:offsetWidth",
										function( event, offsetWidth ){
											console.debug( "Change this property: ", offsetWidth );
											console.log( "Barter app offsetWidth property of element changes!" );
										} );
								}
							} );

						controllerWrap( element, "BarterAppController",
							function( ){
								$compile( element );
							} );

						setTimeout( function( ){
							console.debug( "Changing sample-attr to 'Hello World'" );
							scope.element.attr( "sample-attr", "Hello World" );
						}, 1000 );

						setTimeout( function( ){
							console.debug( "Changing sample-attr to ''" );
							scope.element.attr( "sample-attr", "" );
						}, 1500 );

						setTimeout( function( ){
							console.debug( "Changing sample-attr2 to 'Yeah!'" );
							scope.element.attr( "sample-attr2", "Yeah!" );
						}, 2000 );

						setTimeout( function( ){
							console.debug( "Changing sample-attr2 to 'Yeah!2'" );
							scope.element.attr( "sample-attr2", "Yeah!2" );
						}, 2100 );

						setTimeout( function( ){
							console.debug( "Changing offsetWidth to 1000." );
							scope.element.css( "width", "1000px" );
						}, 2300 );

						setTimeout( function( ){
							console.debug( "Changing this-attr to 'boom!'" );
							scope.element.attr( "this-attr", "boom!" );
						}, 4000 );

						/*setTimeout( function( ){
							elementWatcher.deactivateWatcher( );
						}, 4100 );*/

					}
				};
			} );
	} );