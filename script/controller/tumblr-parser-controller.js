define( [ "barterModule", "jquery" ],
	function( barterModule ){
		var tumblrParser = $( "tumblr-parser" );
		tumblrParser.ready( function( ){
			barterModule.controller( "TumblrParserController",
				function( $scope ){
					console.debug( "Tumblr parser controller loaded! ", $scope );
				} );	
		} );
	} );