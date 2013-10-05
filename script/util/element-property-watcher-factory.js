define( [ "barterModule", "jquery", "underscore" ],
	function( barterModule ){
		barterModule.factory( "elementPropertyWatcher",
			function( elementWatcher, inspectElement, singularData ){
				return function elementPropertyWatcher( id, scope, properties, options ){
					if( !( "element" in scope ) ){
						console.debug( "Cannot register element property watcher, element cannot be retrieved!", scope );
						throw new Error( "cannot register element property watcher, element cannot be retrieved" );
					}

					var scope;
					if( properties instanceof Array
						&& "scope" in properties )
					{
						scope = properties.scope;
					}
					//Note that this will return a function that you can update.
					properties = inspectElement( scope.element, properties, scope );

					var parsers = _.map( properties,
						function( property ){
							return function parser( scope ){
								//Save the property name as property type.
								//	because this will be overriden. 
								propertyType = property;

								//Let's try to update :D
								var propertyData = properties( )[ property ];

								//Property data can be an object containing attribute and property 
								//	or any data taken from inspecting.
								if( typeof propertyData == "object" 
									&& "attribute" in propertyData
									&& "property" in propertyData )
								{
									var attribute = propertyData.attribute;
									var property;
									try{
										property = $( propertyData.property );
										if( _.isEmpty( property ) ){
											property = propertyData.property;
										}else{
											property = property.clone( )
												.wrap( "<content></content>" ).parent( ).html( );
										}
									}catch( exception ){
										property = $( "<content>" 
												+ propertyData.property 
											+ "</content>" ).html( );
									}
									propertyData = {
										"attribute": attribute,
										"property": property
									};
									propertyData = propertyType + ":" 
										+ singularData.encode( JSON.stringify( propertyData ) ) + ";";
								}else{
									var property;
									try{
										property = $( propertyData );
										if( _.isEmpty( property ) ){
											property = propertyData;
										}else{
											property = property.clone( )
												.wrap( "<content></content>" ).parent( ).html( );
										}
									}catch( exception ){
										property = $( "<content>" 
												+ propertyData.property 
											+ "</content>" ).html( );
									}
									propertyData = property;
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

					options.parsers = parsers;
					elementWatcher.registerElement( id, scope, options );
				};
			} );
	} );