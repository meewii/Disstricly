angular.module("App.Endings", [])

	.controller('HappyCtrl', ['$scope', '$location', '$http', 'API_URL', 'District', '$cookies',
	    function($scope, $location, $http, API_URL, District, $cookies) {
	  
			$scope.chosenDistrict = District.getItem();
			$scope.playAgain = function() {
				//District.setItem(null);
				$cookies.requestedDistrict = null;
				$location.path('/');
			};

		}
	])

	.controller('BadCtrl', ['$scope', '$location', '$http', 'API_URL', 'District',
	    function($scope, $location, $http, API_URL, District) {
	  
			$scope.chosenDistrict = District.getItem();
			$scope.playAgain = function() {
				District.setItem(null);
				$location.path('/');
			};
			
		}
	])
	
;
