var app = angular.module('flapperNews', ['ui.router']);

app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts){
    $scope.test = "Hello world!";
    $scope.posts = posts.posts

    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') {return;}
      $scope.posts.push({
        title: $scope.title,
        url: "https://"+$scope.url,
        upvotes: 0,
        comments: [
          {author: "Carl", body: "Awesome post!", upvotes: 0},
          {author: "Patrick", body: "Great read!", upvotes: 0}
        ]
      });
      $scope.title = ''
      $scope.url = ''
    };
    $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
    }
  }]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts) {
    $scope.post = posts.post[$stateParams.id];
    $scope.addComment = function() {
      if ($scope.body === '') {return;}
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };
}]);

app.factory('posts', [function(){
  var o = {
    posts: [
      {title: 'Github', upvotes: 53, url: "https://www.github.com"},
      {title: 'HackerNews', upvotes: 23, url: "https://news.ycombinator.com"},
      {title: 'Twitter', upvotes: 25, url: "https://www.twitter.com"},
      {title: 'Google', upvotes: 39, url: "https://www.google.com"},
      {title: 'GeekWire', upvotes: 44, url: "https://www.geekwire.com"}
    ]
  };
  return o;
}]);


app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      });

    $stateProvider
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

    $urlRouterProvider.otherwise('home');
}]);