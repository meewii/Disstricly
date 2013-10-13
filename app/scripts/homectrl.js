angular.module("App.Home", [])
	
	.controller('HomeCtrl', ['$scope', '$http', 'API_URL', 'District', '$location',
	    function($scope, $http, API_URL, District, $location) {
	  		
			$http.get('models/districts.json').then(function(response) {
				$scope.districtsList = response.data;
			}, function(reason) {
				alert("Failed fetching districts.json (Status " + reason.status + ")");
			});

			$scope.selected = function() {
    			District.setItem($scope.selecteddistrict);
    			$location.path('/play');
  			}
			
		}
	])

	.controller('PlayCtrl', ['$scope', '$http', 'API_URL', 'District', '$location',
	    function($scope, $http, API_URL, District, $location) {
	  		
	    	$scope.chosenDistrict = District.getItem();

			$scope.play = function() {
				$location.path('/images');
			}
			
		}
	])

;
