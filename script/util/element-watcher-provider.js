define( [ "barterModule", "jquery", "underscore", "singularData" ],
	function( barterModule ){
		barterModule.provider( "elementWatcher",
			function( ){
				var elementList = { };

				var watchElements = function watchElements( ){
					//console.time( "watch-elements" );
					_.each( elementList,
						function( elementData, id ){
							var parsers;
							if( "parsers" in elementData ){
								parsers = elementData.parsers;
							}
							elementData.parseElementContent( parsers );
						} );
					//console.timeEnd( "watch-elements" );
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
									
									parserIDs = _.map( options.parsers,
										function( parserData ){
											return parserData.parserID;
										} );
									var parserList = elementList[ id ].parserList || [ ];
									parserList = _.difference( parserIDs, parserList );
									if( _.isEmpty( parserList ) ){
										return;
									}

									elementList[ id ].parserList = ( elementList[ id ].parserList || [ ] )
										.concat( parserList );
									parsers = _.map( options.parsers,
										function( parserData ){
											return parserData.parser;
										} );
									parsers = parsers.concat( elementParsers );
								}
							}

							if( id in elementList ){
								if( !_.isEmpty( parsers ) ){
									elementList[ id ].parsers = parsers;
									if( typeof options == "object" ){
										if( "callback" in options
											&& typeof options.callback == "function" )
										{
											options.callback( );
										}
									}
									return;
								}
								console.debug( "Cannot register element watcher, ID already exists! ID: ", id );
								throw new Error( "cannot register element watcher, id already exists" );
							}

							//Transform the DOM object into jQuery object.
							if( !( scope.element instanceof jQuery ) ){
								scope.element = $( scope.element );
							}

							//This will check if the scope is added-before-then-removed.
							var hasElementContent = ( "elementContent" in scope );

							//Create a single content dom.
							var content = $( "<content></content>" );
							
							var elementContent;
							var parseElementContent = function parseElementContent( parsers ){
								//Get the content thanks to this: 
								//	http://stackoverflow.com/questions/8127091/jquery-get-dom-element-as-string
								var parsedContent = content.append( scope.element.clone( ) ).html( );
								content.empty( );
								scope.elementContent = singularData.encode( parsedContent ) + ";";
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
										var contents = _.compact( elementContent.split( ";" ) );
										var changes = _.chain( contents )
											.map( function( changeContent ){
												if( ( /^[^:]+?:[^:]+?$/ ).test( changeContent ) ){
													var contentData = changeContent.split( ":" );
													var contentType = contentData[ 0 ];
													var contentValue = singularData.decode( contentData[ 1 ] );
													if( ( /(\<\/?[^\<\>]+\>)+/ ).test( contentValue ) ){
														try{
															contentValue = $( contentValue );
														}catch( exception ){
															contentValue = $( "<content>" + contentValue + "</content>" );
														}
														var tagName = contentValue.prop( "tagName" ).toLowerCase( );
														if( tagName == "content" ){
															if( contentValue.find( "*" ).length == 1 ){
																contentValue = contentValue.html( );
															}
														}
													}
													if( ( /\[null\]|\[false\]/ ).test( contentValue ) ){
														contentValue = eval( contentValue.replace( /\[|\]/g, "" ) );
													}else if( ( /^\d+$/ ).test( contentValue ) ){
														contentValue = eval( contentValue );
													}
													changeList[ contentType ] = contentValue;
													return contentType;
												}else{
													changeList[ "element" ] = $( "<content>" 
															+ singularData.decode( changeContent )
														+ "</content>" );
												}
											} )
											.compact( )
											.value( );

										//Either use the override listener or use the $on.
										if( typeof options == "object" ){
											if( "listener" in options
												&& typeof options.listener == "function" )
											{
												options.listener( changes, changeList );
												return;
											}
										}

										if( !_.isEmpty( changes ) ){
											_.each( changes,
												function( changeType ){
													scope.$broadcast( "dom-change:" + changeType,
														changeList[ changeType ] );
												} );
										}
										
										//Now they can listen for this!
										scope.$broadcast( "dom-change", changeList[ "element" ] );
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
					};
				};
			} );
	} );