define( [ "barterModule" ],
	function( barterModule ){
		barterModule.service( "singularData",
			function( ){
				return {
					"encode": function encode( data ){
						return window.btoa( unescape( encodeURIComponent( data ) ) );
					},
					"decode": function decode( data ){
						return decodeURIComponent( escape( window.atob( data ) ) );
					}
				};
			} );
	} );