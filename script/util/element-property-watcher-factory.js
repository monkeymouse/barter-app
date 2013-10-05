define( [ "barterModule", "jquery", "underscore" ],
	function( barterModule ){
		barterModule.factory( "elementPropertyWatcher",
			function( elementWatcher, inspectElement ){
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
							return function parser( ){
								var propertyData = properties( )[ property ];
								if( typeof propertyData == "object" ){
									
								}
							};
						} );

					elementWatcher.registerElement( id, scope, {

					} );
				};
			} );
	} );