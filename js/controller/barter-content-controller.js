barter.controller( "ContentController",
	function( $scope ){
		$scope.postList = $scope.postList || { };
		$scope.currentPageNumber = 1;
		$scope.previousPageNumber = 1;
		$scope.nextPageNumber = 2;

		$scope.nextPage = function nextPage( ){
			console.log( "Content controller next page." );
		};

		$scope.previousPage = function previousPage( ){
			console.log( "Content controller previous page." );
		};

		$scope.$watch( "currentPageNumber",
			function( ){

			} );

		$scope.$watch( "postList",
			function( ){
				console.debug( "CONTENT-CONTROLLER: ", $scope );

				//Send the data to the original page.
				//This will not execute if the current has no iframe.
				/*if( window.location.href != window.parent.location.href ){
					$( window.document ).contents
					var data = encode( JSON.stringify( $scope.postList ) );
					$( window.parent.document ).contents( )
						.find( "pagination" ).attr( "post-list-update", data );
				}*/
			} );
	} );