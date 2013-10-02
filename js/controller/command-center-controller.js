define( [ "barterModule", "jquery" ],
	function( barterModule ){
		var commandCenter = $( "command-center" );
		commandCenter.ready( function( ){
			commandCenter.on( "accessible",	
				function( ){
					//NOTE: This should only be called when the controller is already assigned.
					barterModule.controller( "CommandCenterController",
						function( $scope ){
							console.debug( "Command center controller loaded! ", $scope );
						} );
				} );
		} );
	} );