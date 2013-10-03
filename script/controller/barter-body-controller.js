define( [ "barterModule" ],
	function( barterModule ){
		barterModule.controller( "BarterBodyController",
			function( $scope ){
				console.debug( "Barter body controller loaded! ", $scope );
			} );
	} );