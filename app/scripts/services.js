// services
angular.module("App.Services", [])
  
  .service("SeeDetails", ["$rootScope",  
    function($rootScope) {
      
      var selected_item = null;

      return {
        getItem: function() {
          return selected_item;
        },
        setItem: function(item) {
          selected_item = item;
        }
      }
  }])
;