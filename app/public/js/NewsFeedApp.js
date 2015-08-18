angular.module('NewsFeedApp', ['ngFacebook'])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('<your-facebook-app-id>');
})

.run( function($rootScope) {
  // Cut and paste the "Load the SDK" code from the facebook javascript sdk page.

  // Load the facebook SDK asynchronously
  (function(){
  
   }());
})

;

var DemoCtrl = function ($scope, $facebook) {
  
  function refresh() {
    $facebook.api("/me").then( 
      function(response) {
        $scope.welcomeMsg = "Welcome " + response.name;
      },
      function(err) {
        $scope.welcomeMsg = "Please log in";
      });
  }
};