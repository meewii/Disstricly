angular.module("App.Sounds", [])
	
	.controller('FakeCtrl', ['$scope', '$http', 'API_URL', 'District', '$location', '$cookies',
	    function($scope, $http, API_URL, District, $location, $cookies) {
	  		
	  		$scope.chosenDistrict = District.getItem();
	  		$scope.goToSounds = function() {
	  			$location.path('/sounds');
	  		};

	  		$scope.giveUp = function() {
	  			//District.setItem(null);
	  			$cookies.requestedDistrict = null;
	  			$location.path('/');
	  		}
			
		}
	])

	.controller('SoundsCtrl', ['$scope', '$http', 'API_URL', 'District', '$location', '$timeout',
	    function($scope, $http, API_URL, District, $location, $timeout) {
	  		
	  		var randomTrack;
	  		$scope.chosenDistrict = District.getItem();

	  		$http.get('models/districts.json').then(function(resp) {
					//console.log(resp.data);
				
				var districtsList = resp.data;
				$scope.randomDistrict = districtsList[Math.floor(Math.random() * districtsList.length)];

		        SC.initialize({
		          client_id: '0391e5e99cb01420369bd02883c5142d'
		        });
		        SC.get('/tracks', { q: $scope.randomDistrict.name }, function(tracks) {
		          
					$scope.randomTrack = tracks[Math.floor(Math.random() * tracks.length)];

					//$scope.template = 'views/iframe.html';

		        });
		       	
		        var counter = 3;
			    $scope.onTimeout = function(){
			        counter--;
			        if (counter > 0) {
			            mytimeout = $timeout($scope.onTimeout,1000);
			        } else {
			        	console.log($scope.randomTrack)
			        	var iframe = '<iframe id="sc-widget" src="https://w.soundcloud.com/player/?url=' + $scope.randomTrack.uri +
			        				 '&auto_play=false&buying=false&liking=false&sharing=false&show_artwork=false&show_comments=false&show_playcount=false&show_user=false&start_track=0"' +
			        				 ' width="100%" height="150" scrolling="no" frameborder="no"></iframe>';
						angular.element('#iframe').html(iframe);
						$scope.hider = true;
						//$scope.template = 'views/iframe.html';
			        }
			    }
			    var mytimeout = $timeout($scope.onTimeout,1000);


		    }, function(reason) {
				alert("Failed fetching districts.json (Status " + reason.status + ")");
			});
		

		    $scope.submitSound = function(etat) {

		    	if(etat) {
		    		if($scope.randomDistrict._id === $scope.chosenDistrict._id) {
			    		$location.path('/happyending');
			    	} else {
			    		$location.path('/badending');
			    	}
		    	} else {
		    		if($scope.randomDistrict._id === $scope.chosenDistrict._id) {
			    		$location.path('/badending');
			    	} else {
			    		$location.path('/happyending');
			    	}
		    	}

		    	console.log('$scope.randomDistrict', $scope.randomDistrict)
		    	console.log('$scope.chosenDistrict', $scope.chosenDistrict)

		    }
        	
		}
	])

;
