require.config( {
	"shim": {
		"barter-data": {
			"exports": "barterData"
		},
		"barter-settings": {
			"exports": "barterSettings"
		}
	}
} );

//NOTE: that this is the boot process.
/*
	The boot process involves:
		1. Loading boot resources,
		2. Enabling load order for verification stage,
		3. Firing up verification process,
		4. Site modification for permitted stage or,
		5. Site modification for rejected stage.
*/
require( [ "barter-data", "barter-settings" ],
	function( barterData, barterSettings ){

		//Load all requirejs variables
		require.config( barterData.REQUIREJS_VARIABLES );

		//TODO: Initialize loading UI here.

		//Load less files on boot process.
		require( barterData.LESS_VARIABLES.boot );

		//Enable load order for verification stage.
		require( barterData.LOAD_ORDER_VARIABLES.onVerify,
			function( ){
				angular.bootstrap( document, [ "barter" ] );

				//TODO: Fire the verification process.
			} );
	} );