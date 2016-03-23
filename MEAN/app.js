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
    };
    $scope.deletePost = function(post) {
      var index = $scope.posts.indexOf(this.post);
      $scope.posts.splice(index,1);
    };
  }]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function() {
      if ($scope.body === '') {return;}
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };
    $scope.incrementUpvotes=function(comment) {
      comment.upvotes +=1;
    };
    $scope.deletePost= function(post) {
      var index = $scope.posts.indexOf(post);
      $scope.posts.splice(index,1);
    };
}]);

app.factory('posts', [function(){
  var o = {
    posts: [
      {title: 'Github', upvotes: 53, url: "https://www.github.com", comments: []},
      {title: 'HackerNews', upvotes: 23, url: "https://news.ycombinator.com", comments: []},
      {title: 'Twitter', upvotes: 25, url: "https://www.twitter.com", comments: []},
      {title: 'Google', upvotes: 39, url: "https://www.google.com", comments: []},
      {title: 'GeekWire', upvotes: 44, url: "https://www.geekwire.com", comments: []}
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