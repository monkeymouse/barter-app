define( [ "barterModule", "jquery", "underscore" ],
	function( barterModule ){
		barterModule.factory( "elementPropertyWatcher",
			function( elementWatcher, inspectElement, singularData ){
				return function elementPropertyWatcher( id, scope, properties, options ){
					if( !( "element" in scope ) ){
						console.debug( "Cannot register element property watcher, element cannot be retrieved!", scope );
						throw new Error( "cannot register element property watcher, element cannot be retrieved" );
					}

					var scopeType;
					if( properties instanceof Array
						&& "scope" in properties )
					{
						scopeType = properties.scope;
					}

					//Save the properties this will be used by the boot parser.
					var propertyList = properties;

					var parsers;
					var bootParser = function bootParser( scope, property ){
						//Note that this will return a function that you can update.
						if( property !== undefined ){
							properties = [ property ];
						}

						var updateProperties = inspectElement( scope.element, properties, scopeType );
						var propertyList = updateProperties( ); 
						parsers = _.map( propertyList,
							function( x, index ){
								return function parser( scope ){
									//Let's try to update :D
									propertyList = updateProperties( );
									var propertyData = propertyList[ index ];
									var propertyType = propertyData.name;
									var propertyData = propertyList[ propertyType ];

									if( propertyData === undefined ){
										/*console.debug( "Property data to be parsed for", propertyType,
											" is undefined. ", propertyData );*/
										return;
									}

									//Property data can be an object containing attribute and property 
									//	or any data taken from inspecting.
									if( propertyData !== null
										&& typeof propertyData == "object" 
										&& "attribute" in propertyData
										&& "property" in propertyData )
									{
										var attribute = propertyData.attribute;
										if( attribute === false ){
											attribute = "[false]";
										}else if( attribute === null ){
											attribute = "[null]";
										}
										var property = propertyData.property;
										if( property === null ){
											property = "[null]";
										}else{
											try{
												property = $( property );
												if( _.isEmpty( property ) ){
													property = property;
												}else{
													property = property.clone( )
														.wrap( "<content></content>" ).parent( ).html( );
												}
											}catch( exception ){
												property = $( "<content>" 
														+ property + "</content>" ).html( );
											}
										}
										propertyData = {
											"attribute": attribute,
											"property": property
										};
										propertyData = propertyType + ":" 
											+ singularData.encode( JSON.stringify( propertyData ) ) + ";";

									}else{
										if( propertyData === false ){
											propertyData = "[false]";
										}else if( propertyData === null ){
											propertyData = "[null]";
										}else{
											var property;
											try{
												property = $( propertyData );
												if( _.isEmpty( property ) 
													|| property.prop( "tagName" ) === undefined )
												{
													property = propertyData;
												}else{
													property = property.clone( )
														.wrap( "<content></content>" ).parent( ).html( );
												}
											}catch( exception ){
												property = $( "<content>" 
													+ propertyData + "</content>" ).html( );
											}
											propertyData = property;
										}
										propertyData = propertyType + ":" 
											+ singularData.encode( propertyData ) + ";";
									}

									if( scope !== undefined ){
										if( "elementContent" in scope ){
											scope.elementContent += propertyData;
										}
									}
									
									return propertyData;
								};
							} );

						if( !_.isEmpty( parsers ) && property === undefined ){
							return parsers;
						}else if( !_.isEmpty( parsers ) && property !== undefined ){
							_.each( parsers,
								function( parser ){
									parser( scope );
								} );
						}
					};

					//The attribute might be there so initialize already.
					parsers = bootParser( scope );

					/*
						Issue: when the inspector discovers no property of that kind,
							it will not create a parser. And nothing will be parsed.

						Create a boot parser that will parse + check and return whatever
							the parser parses.

						Only create a boot parser if there are no parsers.
					*/
					if( _.isEmpty( parsers ) ){
						parsers = _.map( propertyList,
							function( property ){
								return function parser( scope ){
									bootParser( scope, property );
								}
							} );
					}

					options.parsers = parsers;
					elementWatcher.registerElement( id, scope, options );
				};
			} );
	} );