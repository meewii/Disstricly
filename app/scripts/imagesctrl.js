angular.module("App.Images", [])
	
	.factory("District", ['$cookies', 
	    function($cookies) {
	      
			var requestedDistrict = null;

			return {
				setItem: function(item) {
					var itemJson = JSON.stringify(item);
	          		$cookies.requestedDistrict = itemJson;
				},
				getItem: function() {

				  	if (!requestedDistrict) requestedDistrict = JSON.parse($cookies.requestedDistrict);
					console.log(requestedDistrict);

	          		return requestedDistrict;
				}
			}
	}])


	.controller('ImagesCtrl', ['$scope', '$location', '$http', 'API_URL', 'District', '$timeout',
	    function($scope, $location, $http, API_URL, District, $timeout) {
	  
			$scope.pageTitle = 'Results';
			$scope.mymodel = 'nothing';
			var chosenDistrict = District.getItem();

			if(!chosenDistrict._id) {
				//console.log('wtf?')
				$location.path('/');
			} else {

				$http.get('models/districts.json').then(function(resp) {
					//console.log(resp.data);
					$scope.districtsList = resp.data;

					// images of chosen district
					var request = encodeURIComponent(chosenDistrict.name);
					var url = API_URL + '&q=' + request + '&includeAlbums=true';
					var newList = [];
					$http.get(url).then(function(response) {
						//console.log(response.data);
						$scope.chosenDistrictList = response.data.albums.items;
						for(var i=0; i<4; i++) {
							$scope.chosenDistrictList[i].district = chosenDistrict._id;
							newList.push($scope.chosenDistrictList[i]);
						}

						// we remove the chosen city from the list
						var newDistrictsList = _.filter($scope.districtsList, function(num){ return num._id !== chosenDistrict._id; });
						// we chose a random other district
						var randomDistrict = newDistrictsList[Math.floor(Math.random() * newDistrictsList.length)];

						// images of random district
						var request2 = encodeURIComponent(randomDistrict.name);
						var url2 = API_URL + '&q=' + request2 + '&includeAlbums=true';
						$http.get(url2).then(function(response) {
							//console.log(response.data);
							var r = response.data.albums.items;
							for(var i=0; i<5; i++) {
								r[i].district = randomDistrict._id;
								newList.push(r[i]);
							}
							$scope.items = newList;

						}, function(reason) {
							alert("Failed fetching eyeem search 2 (Status " + reason.status + ")");
						});

					}, function(reason) {
						alert("Failed fetching eyeem search 1 (Status " + reason.status + ")");
					});

				}, function(reason) {
					alert("Failed fetching districts.json (Status " + reason.status + ")");
				});
				

				$scope.selectedImg = [];

				$scope.submitSelection = function() {
					var slct = [];
					for(img in $scope.selectedImg) {
						if($scope.selectedImg[img]) {
							slct.push(img);
						}
					}
					if(slct.length !== 5) {
						alert('we said 5!');
					} else {
						
						var calcul = [];

						for(var m=0, n=$scope.chosenDistrictList.length; m<n; m++) {

							for(var k=0, l=slct.length; k<l; k++) {

								if($scope.chosenDistrictList[m].id === slct[k]) {
									calcul.push($scope.chosenDistrictList[m]);
									console.log(calcul)
								}

							}
						}


						var counter = 5;
					    $scope.waiting = false;

					    $scope.onTimeout = function(){
					        counter--;
					        if (counter > 0) {
					    		$scope.waiting = true;
					            mytimeout = $timeout($scope.onTimeout,1000);
					        }
					        else {
					    		$scope.waiting = false;
					            console.log("Time is up!");
					            if(calcul.length > 2) {
									$location.path('/fakeending');
								} else {
									$location.path('/badending');
								}
					        }
					    }
					    var mytimeout = $timeout($scope.onTimeout,1000);
					    
					  

					}
				}

				




			}

			
		}
	])
	
;
