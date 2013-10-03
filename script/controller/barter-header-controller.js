define( [ "barterModule" ],
	function( barterModule ){
		barterModule.controller( "BarterHeaderController",
			function( $scope ){
				console.debug( "Barter header controller loaded! ", $scope );
			} );
	} );