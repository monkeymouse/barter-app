require.config( {
	"shim": {
		"barter-data": {
			"exports": "barterData"
		}
	}
} );

require( [ "barter-data" ],
	function( barterData ){
		console.debug( "Inside require: ", barterData );

		require.config( barterData.REQUIREJS_VARIABLES );

		require( [
				"angular",
				"barterModule",
				"controllerWrap",
				"barterAppDirective",
				"barterAppController",
				"tumblrParserDirective",
				"tumblrParserController",
				"commandCenterDirective",
				"commandCenterController"
			],
			function( ){
				angular.bootstrap( document, [ "barter" ] );
			} );
	} );