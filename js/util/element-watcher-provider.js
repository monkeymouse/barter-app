define( [ "barterModule", "jquery", "underscore", "singularData" ],
	function( barterModule ){
		barterModule.provider( "elementWatcher",
			function( ){
				var elementList = { };

				var watchElements = function watchElements( ){
					_.each( elementList,
						function( elementData, id ){
							//console.log( "Watching on " + id );
							elementData.parseElementContent( );
						} );
				};

				//Loop for every 100 milliseconds.
				var intervalID;
				var activateWatcher = function activateWatcher( delay ){
					if( typeof delay != "number" ){
						delay = 300;
					}
					if( delay < 100 ){
						delay = 300;
					}
					intervalID = setInterval( watchElements, delay );
					console.debug( "Global element watcher activated.", intervalID );
				};
				activateWatcher( );

				var deactivateWatcher = function deactivateWatcher( ){
					clearInterval( intervalID );
					console.debug( "Global element watcher deactivated.", intervalID );
				};

				this.$get = function( singularData ){
					return {
						"deactivateWatcher": deactivateWatcher,

						"activateWatcher": activateWatcher,

						"registerElement": function registerElement( id, scope, options ){
							if( id in elementList ){
								throw new Error( "cannot register element watcher, id already exists" )
							}

							//Transform the DOM object into jQuery object.
							if( !( scope.element instanceof jQuery ) ){
								scope.element = $( scope.element );
							}

							//This will check if the scope is added before then removed.
							var hasElementContent = ( "elementContent" in scope );
							
							var elementContent;
							var parseElementContent = function parseElementContent( ){
								//Get the content thanks to this: 
								//	http://stackoverflow.com/questions/8127091/jquery-get-dom-element-as-string
								scope.elementContent = singularData.encode( scope.element.clone( )
									.wrap( "<content></content>" ).parent( ).html( ) );
								scope.safeApply( );
							};

							//We don't want to watch again.
							if( !hasElementContent ){
								//Register the watcher for this scope.
								scope.$watch( "elementContent",
									function( newValue ){
										if( !newValue && !elementContent ){
											return;
										}
										if( newValue == elementContent 
											|| ( typeof newValue == "string" 
											&& typeof elementContent == "undefined" ) )
										{
											elementContent = newValue
											return;
										}
										elementContent = newValue;

										//Either use the override listener or use the $on.
										if( typeof options == "object" ){
											if( "listener" in options
												&& typeof options.listener == "function" )
											{
												options.listener( );
												return;
											}
										}
										
										//Now they can listen for this!
										scope.$emit( "dom-change" );
									} );	
							};

							//Store the scope. Hope this will work.
							elementList[ id ] = {
								"scope": scope,
								"parseElementContent": parseElementContent
							};

							if( typeof options == "object" ){
								if( "callback" in options
									&& typeof options.callback == "function" )
								{
									options.callback( );
								}
							}
						},

						"dropElement": function dropElement( id ){
							if( id in elementList ){
								delete elementList[ id ];
							}
						}
					}
				};
			} );
	} );