'use strict';

angular.module("App.Constants", []).constant("API_URL", "https://api.eyeem.com/v2/search?access_token=f346d6846f025af0327e840cce90591310ab5c0c")

angular.module("App", [
    "App.Constants",
    "App.Home",
    "App.Images",
    "App.Sounds",
    "App.Endings",
    //"App.Directives",
    "ngCookies",
    "ngRoute"
  ])

  .config(["$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(false); 

    $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
      controller: "HomeCtrl"
    })
    .when("/play", {
      templateUrl: "views/play.html",
      controller: "PlayCtrl"
    })
    .when("/images", {
      templateUrl: "views/images.html",
      controller: "ImagesCtrl"
    })
    .when("/badending", {
      templateUrl: "views/badending.html",
      controller: "BadCtrl"
    })
    .when("/fakeending", {
      templateUrl: "views/fakeending.html",
      controller: "FakeCtrl"
    })
    .when("/sounds", {
      templateUrl: "views/sounds.html",
      controller: "SoundsCtrl"
    })
    .when("/happyending", {
      templateUrl: "views/happyending.html",
      controller: "HappyCtrl"
    });
  }])

;
  








