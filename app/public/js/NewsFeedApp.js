angular.module('NewsFeedApp', ["ngResource", "ngFacebook"])

.config(['$facebookProvider', function($facebookProvider) {
  $facebookProvider.setAppId('507795686053080').setPermissions(['email','user_friends','user_likes', 'user_posts']);
}]).run(['$rootScope', '$window', function($rootScope, $window) {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    $rootScope.$on('fb.load', function() {
      $window.dispatchEvent(new Event('fb.load'));
    });
  }]);

angular.module('NewsFeedApp').controller('DemoCtrl', function ($scope, $facebook) {
  $scope.loginLagel = "LOGIN";
  $scope.shareLabel = "SHARE";
  $scope.logged     = false;
  
  $scope.$on('fb.auth.authResponseChange', function(){
      $scope.status = $facebook.isConnected();
      $scope.logged = $scope.status;
      if($scope.status) {
        $scope.getFriends();
        $scope.loginLagel = "LOGOUT";      
        $facebook.cachedApi('/me').then(function(me) {
          $scope.me = me;
        });
      }
    });

    $scope.loginToggle = function() {
      if($scope.status) {
        $scope.loginLagel  = "LOGIN";
        $scope.logged         = false;
        $facebook.logout();
        $scope.friends = "";
      } else {

        $facebook.login();
      }
    };

    $scope.getFriends = function() {
      if(!$scope.status) return;
      $facebook.cachedApi('/me/friends').then(function(friends) {
        $scope.friends = friends.data;
      });
    }

    $scope.share = function(){
      $facebook.ui({
        method: 'feed',
        name: 'Café com Java',
        picture: 'http://www.cafecomjava.com.br/imgs/logomarcavertical.png',
        link: 'http://www.cafecomjava.com.br',
        description: 'The best place to learn about many different technologies!!'
      },
      function (res) {
        
      });
    }
});