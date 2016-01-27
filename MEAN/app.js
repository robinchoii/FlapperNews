var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
  '$scope',
  function($scope) {
    $scope.test = 'Hello world!';
    $scope.posts = [
      {title: 'post 1', upvotes: 10},
      {title: 'post 2', upvotes: 8},
      {title: 'post 3', upvotes: 6},
      {title: 'post 4', upvotes: 4},
      {title: 'post 5', upvotes: 2}
    ];
    $scope.addPost = function() {
      if(!$scope.title || $scope.title === '') { return;}
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0
      });
      $scope.title = "";
      $scope.link = "";
    };
    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
  }]);