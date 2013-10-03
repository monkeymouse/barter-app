define( [ "barterModule" ],
	function( barterModule ){
		barterModule.controller( "BarterAppController",
			function( $scope ){
				console.debug( "Barter application controller loaded! ", $scope );
			} );
	} );