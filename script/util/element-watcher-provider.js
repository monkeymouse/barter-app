define( [ "barterModule", "jquery", "underscore", "singularData" ],
	function( barterModule ){
		barterModule.provider( "elementWatcher",
			function( ){
				var contentFormat = /^[^:]+?:[^:]+?$/;
				var htmlFormat = /(\<\/?[^\<\>]+\>)+/;
				var nullFalseFormat = /\[null\]|\[false\]/;
				var numberFormat = /^\d+$/;
				var bracketFormat = /\[|\]/g;

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
							if( !( "element" in scope ) 
								&& !( "element" in options ) )
							{
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
							var element;
							if( "element" in options ){
								if( !( options.element instanceof jQuery ) ){
									options.element = $( options.element );
								}
								element = options.element;
							}else if( !( scope.element instanceof jQuery ) ){
								scope.element = $( scope.element );
								element = scope.element;
							}

							//This will check if the scope is added-before-then-removed.
							var hasElementContent = ( "elementContent" in scope );

							//Create a single content dom.
							var content = $( "<content></content>" );
							
							var elementContent;
							var parseElementContent = function parseElementContent( parsers ){
								//Get the content thanks to this: 
								//	http://stackoverflow.com/questions/8127091/jquery-get-dom-element-as-string
								var parsedContent = content.append( element.clone( ) ).html( );
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
												if( contentFormat.test( changeContent ) ){
													var contentData = changeContent.split( ":" );
													var contentType = contentData[ 0 ];
													var contentValue = singularData.decode( contentData[ 1 ] );
													if( htmlFormat.test( contentValue ) ){
														try{
															//We need to check if this is a valid html element.
															contentValue = $( contentValue );
														}catch( exception ){
															//The content may start with a text node.
															//Encapsulate it in content tags.
															contentValue = $( "<content>" + contentValue + "</content>" );
														}
														var tagName = contentValue.prop( "tagName" ).toLowerCase( );
														if( tagName == "content" ){
															//If the content value only has 1 node that should be a text node.
															if( contentValue.find( "*" ).length == 0 ){
																contentValue = contentValue.html( );
															}
														}
													}
													if( nullFalseFormat.test( contentValue ) ){
														contentValue = eval( contentValue.replace( bracketFormat, "" ) );
													}else if( numberFormat.test( contentValue ) ){
														contentValue = eval( contentValue );
													}
													changeList[ contentType ] = contentValue;
													return contentType;
												}else{
													//All element content values should be decoded.
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