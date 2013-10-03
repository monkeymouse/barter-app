require.config( {
	"shim": {
		"barter-data": {
			"exports": "barterData"
		}
	}
} );

require( [ "barter-data" ],
	function( barterData ){
		require.config( barterData.REQUIREJS_VARIABLES );

		require( [ "less!style/sample.less" ],
			function( ){

			} );

		require( [
				"angular",

				"barterModule",

				"controllerWrap",
				"safeApply",
				"singularData",
				"elementWatcher",
				
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