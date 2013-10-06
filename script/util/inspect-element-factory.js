define( [ "barterModule", "jquery", "underscore" ],
	function( barterModule ){
		barterModule.factory( "inspectElement",
			function( ){
				return function inspectElement( element, properties, scope ){
					if( !( element instanceof jQuery ) ){
						element = $( element );
					}
					
					//If the query is empty do not inspect.
					if( element.length != 1 ){
						return [ ];
					}

					var elementProperties = [ ];
					var getElementProperties = function getElementProperties( ){
						elementProperties = _.map( properties,
							function( propertyData ){
								var localScope = propertyData.scope;
								if( scope !== undefined ){
									localScope = scope;
								}

								var propertyType = propertyData.name || propertyData;

								var properties = { };
								var attribute = element.attr( propertyType );
								if( attribute !== false || attribute !== undefined ){
									if( attribute = element.attr( propertyType )
										|| localScope === "attribute" )
									{
										properties[ "attribute" ] = attribute || false;
									}
								}else{
									/*
										IRONCLAD Rule: 
											Non-existing attributes should be null.
											Attributes that exists but no value should be false 
												these includes empty spaces.
									*/
									properties[ "attribute" ] = null;
								}
								
								var property;
								if( property = element.prop( propertyType )
									|| localScope === "property" )
								{
									/*
										IRONCLAD Rule: 
											Non-existing properties should be null.
									*/
									if( property !== undefined ){
										properties[ "property" ] = property;	
									}else{
										properties[ "property" ] = null;
									}
								}
								properties[ "name" ] = propertyType;
								return properties;
							} );

						_.each( elementProperties,
							function( propertyData ){
								if( _.keys( propertyData ).length == 2 ){
									elementProperties[ propertyData.name ] = propertyData.property 
										|| propertyData.attribute;
								}else if( _.keys( propertyData ).length == 3 ){
									elementProperties[ propertyData.name ] = _.pick( propertyData, "property", "attribute" );
								}
							} );
						return elementProperties;
					};

					var updateElementProperties = function updateElementProperties( ){
						var elementProperties = getElementProperties( );
						return elementProperties;
					};

					updateElementProperties( );
					/*
						This will always return a modified inspector function.
						Calling the inspector function will update itself with
							the current property/attribute updates.
					*/
					return updateElementProperties;
				};
			} );
	} );