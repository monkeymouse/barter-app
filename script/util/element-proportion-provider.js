define( [ "barterModule", "jquery", "underscore" ],
	function( barterModule ){
		barterModule.provider( "elementProportion",
			function( ){
				//Only 1 proportion per element is supported.
				//To extend this capability we can add condition to satisfy proportion filters.
				//Condition and proportion filters should be on another factory.

				var proportionList = { };

				this.$get = function( singularData ){
					return {
						"registerProportion": function registerProportion( ){

						}
					};
				};
			} );
	} );