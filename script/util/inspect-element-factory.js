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
							function( value ){
								var localScope = value.scope;
								if( scope !== undefined ){
									localScope = scope;
								}
								var properties = { };
								var attribute;
								if( attribute = element.attr( value )
									|| localScope === "attribute" )
								{
									properties[ "attribute" ] = attribute;
								}
								var property;
								if( property = element.prop( value )
									|| localScope === "property" )
								{
									properties[ "property" ] = property;
								}
								properties[ "name" ] = value.name || value;
								return properties;			
							} );

						_.each( elementProperties,
							function( propertyData ){
								if( _.keys( propertyData ).length == 2 ){
									elementProperties[ propertyData.name ] = propertyData.property 
										|| propertyData.attribute;
								}else{
									elementProperties[ propertyData.name ] = _.pick( propertyData, "property", "attribute" );
								}
							} );

						return elementProperties;
					};

					var updateElementProperties = function updateElementProperties( ){
						var elementProperties = getElementProperties( );
						_.extend( updateElementProperties, elementProperties );
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