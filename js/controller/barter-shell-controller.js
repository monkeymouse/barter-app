define( [ "barterModule" ],
	function( barterModule ){
		barterModule.controller( "BarterShellController",
			function( $scope ){
				console.debug( "Barter shell controller loaded! ", $scope );
			} );
	} );