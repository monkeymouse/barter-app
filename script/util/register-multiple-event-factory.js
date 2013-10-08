define( [ "barterModule", "underscore" ],
	function( barterModule ){
		barterModule.factory( "registerMultipleEvent",
			function( ){
				return function registerMultipleEvent( events, scope, parentEvent ){
					var resultList = [ ];
					var eventName = events.join( "+" );
					if( typeof parentEvent == "string" ){
						eventName = parentEvent + ":" + eventName;
					}
					var resultListener = function resultListener( result, index ){
						resultList[ index ] = result;
						if( resultList.length == events.length
							|| result != resultList[ index ] )
						{
							scope.$broadcast( eventName, resultList );
						}
					};
					var deregisters = _.map( events,
						function( eventType, index ){
							if( typeof parentEvent == "string" ){
								eventType = parentEvent + ":" + eventType;
							}
							return scope.$on( eventType,
								function( eventData, resultData ){
									resultListener( {
										"event": eventData,
										"result": resultData
									}, index );
								} );
						} );

					return function deregisterListeners( ){
						_.each( deregisters,
							function( deregisterListener ){
								deregisterListener( );
							} );
					};
				}
			} );
	} );