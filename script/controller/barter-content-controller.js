define( [ "barterModule" ],
	function( barterModule ){
		barterModule.controller( "BarterContentController",
			function( $scope ){
				console.debug( "Barter content controller loaded! ", $scope );
			} );
	} );