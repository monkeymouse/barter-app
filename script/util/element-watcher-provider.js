define( [ "barterModule", "jquery", "underscore", "singularData" ],
	function( barterModule ){
		barterModule.provider( "elementWatcher",
			function( ){
				var elementList = { };

				var watchElements = function watchElements( ){
					_.each( elementList,
						function( elementData, id ){
							var parsers;
							if( "parsers" in elementData ){
								parsers = elementData.parsers;
							}
							elementData.parseElementContent( parsers );
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
					console.debug( "Global element watcher activated. Interval ID: ", intervalID );
				};
				activateWatcher( );

				var deactivateWatcher = function deactivateWatcher( ){
					clearInterval( intervalID );
					console.debug( "Global element watcher deactivated. Interval ID: ", intervalID );
				};

				this.$get = function( singularData ){
					return {
						"deactivateWatcher": deactivateWatcher,

						"activateWatcher": activateWatcher,

						"registerElement": function registerElement( id, scope, options ){
							if( !( "element" in scope ) ){
								console.debug( "Cannot register element watcher, element cannot be retrieved!", scope );
								throw new Error( "cannot register element watcher, element cannot be retrieved" );
							}

							var parsers;
							if( typeof options == "object" ){
								if( "parsers" in options ){
									elementParsers = elementList[ id ].parsers || [ ];
									parsers = elementParsers.concat( options.parsers );
								}
							}

							if( id in elementList ){
								if( parsers ){
									elementList[ id ].parsers = parsers;
									return;
								}
								console.debug( "Cannot register element watcher, ID already exists! ID: ", id );
								throw new Error( "cannot register element watcher, id already exists" );
							}

							//Transform the DOM object into jQuery object.
							if( !( scope.element instanceof jQuery ) ){
								scope.element = $( scope.element );
							}

							//This will check if the scope is added before then removed.
							var hasElementContent = ( "elementContent" in scope );
							
							var elementContent;
							var parseElementContent = function parseElementContent( parsers ){
								//Get the content thanks to this: 
								//	http://stackoverflow.com/questions/8127091/jquery-get-dom-element-as-string
								scope.elementContent = singularData.encode( scope.element.clone( )
									.wrap( "<content></content>" ).parent( ).html( ) ) + ";";
								if( parsers instanceof Array 
									&& !_.isEmpty( parsers ) )
								{
									_.each( parsers,
										function( parser ){
											parser( scope );
										} );
								}
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
											elementContent = newValue;
											return;
										}
										elementContent = newValue;

										var changeList = { };
										var changes = _.chain( elementContent.split( ";" ) )
											.map( function( changeContent ){
												if( ( /^[^:]+?:[^:]+?$/ ).test( changeContent ) ){
													return changeContent.split( ":" )[ 0 ];
												}else{
													changeList[ "element" ] = $( singularData.decode( changeContent ) );
												}
											} )
											.compact( )
											.value( );

										//Either use the override listener or use the $on.
										if( typeof options == "object" ){
											if( "listener" in options
												&& typeof options.listener == "function" )
											{
												options.listener( changes );
												return;
											}
										}

										if( !_.isEmpty( changes ) ){
											_.each( changes,
												function( change ){
													scope.$emit( "dom-change:" + change );
												} );
										}
										
										//Now they can listen for this!
										scope.$emit( "dom-change", changeList[ element ] );
									} );
							};

							//Store the scope. Hope this will work.
							elementList[ id ] = {
								"scope": scope,
								"parseElementContent": parseElementContent,
								"parsers": parsers
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