define( [ "barterModule", "jquery", "underscore" ],
	function( barterModule ){
		barterModule.provider( "elementProportion",
			function( ){
				//Only 1 proportion per element is supported.
				//To extend this capability we can add condition to satisfy proportion filters.
				//Condition and proportion filters should be on another factory.
				/*
					To register a proportion, it needs the scope where we will attach the listener
						and the options that contains the set of proportion configuration.
					{
						adapt: true, //Adapt has higher priority than relative.
						//If adapt is present it will dispose any relative configuration.
						relative: { //This is in percentage decimal
							width: 
							height: 
						}
						parent: <the element where to adapt or relate the proportion>,
						name: <reference to the proportion>
					}

					The scope should contain an element property.

					The proportion will always be applied to the parent unless an explicit
						parent is given.

					You can put a specific name so that you can reference it back
						when putting conditional proportion filters.

					To register a condition to an existing proportion,
					{
						condition: function(){ 
							return true | false;
						},
						proportion: {
	
						}
						name: <condition reference>
					}

					Conditional proportions will override the main proportion.
					The last condition to return true will be the first to override.

					Optional callback and listener can be integrated.
					Callback will be called after the proportion is created.
					Listener will be appended to the main proportion listener.
				*/

				var proportionList = { };

				this.$get = function( singularData, elementPropertyWatcher ){
					return {
						"registerProportion": function registerProportion( scope, options ){
							var element;
							if( "element" in options ){
								if( !( options.element instanceof jQuery ) ){
									options.element = $( options.element );
								}								
								element = options.element;
							}else{
								if( !( "element" in scope ) ){
									console.debug( "Scope does not have reference to the element.", scope );
									throw new Error( "scope does not contain reference to element" );
								}
								if( !( scope.element instanceof jQuery ) ){
									scope.element = $( scope.element );
								}	
								element = scope.element;
							}

							var parent = element.parent( );
							if( "parent" in options ){
								if( !( options.parent instanceof jQuery ) ){
									options.parent = $( options.parent );
								}
								parent = options.parent;
							}

							if( "adapt" in options ){
								
							}else if( "relative" in options ){

							}else{

							}
						}
					};
				};
			} );
	} );