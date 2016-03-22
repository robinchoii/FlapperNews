var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
  '$scope',
  function($scope){
    $scope.test = "Hello world!";
    $scope.posts = [
      {title: 'Github', upvotes: 53, url: "https://www.github.com"},
      {title: 'HackerNews', upvotes: 23, url: "https://news.ycombinator.com"},
      {title: 'Twitter', upvotes: 25, url: "https://www.twitter.com"},
      {title: 'Google', upvotes: 39, url: "https://www.google.com"},
      {title: 'GeekWire', upvotes: 44, url: "https://www.geekwire.com"}
    ];
    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') {return;}
      $scope.posts.push({
        title: $scope.title,
        url: "https://"+$scope.url,
        upvotes: 0
      });
      $scope.title = ''
      $scope.url = ''
    };
    $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
    }
  }]);