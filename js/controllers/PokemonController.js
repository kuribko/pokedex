app.controller('PokemonController', ['$scope', 'pokemons', function($scope, pokemons) {
  pokemons.success(function(data){
    $scope.pokemons = data;
  });

  $scope.test = "Angular works"
  
}]);