define( [ "barterModule" ],
	function( barterModule ){
		barterModule.factory( "safeApply",
			function( ){
				//Reference: https://coderwall.com/p/ngisma
				return function inject( scope ){
					scope.safeApply = function safeApply( method ){
						var phase = scope.$root.$$phase;
						if( phase == "$apply" || phase == "$digest" ){
							if( typeof method == "function" ){
								method( );
							}
						}else if( typeof method == "function" ){
							this.$apply( method );
						}else{
							this.$apply( );
						}
					};
				};
			} );
	} );