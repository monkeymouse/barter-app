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

		require( [ "less!xstyle/sample.less" ],
			function( ){

			} );

		require( [
				"angular",

				"barterModule",

				"controllerWrap",
				"safeApply",
				"inspectElement",
				"singularData",
				"elementWatcher",
				"elementPropertyWatcher",
				
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