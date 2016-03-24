app.controller('PokemonController', ['$scope', 'pokemons', function($scope, pokemons) {
  pokemons.success(function(data){
    $scope.pokemons = data;
  });

  $scope.test = "Angular works"
  
  $scope.typeColor = function(typeName){
      var colors = ['#FCCB7C', '#7CFC8B', '#FC7CED', '#7CADFC'];
      return colors[typeName.length % 4];
  }
}]);