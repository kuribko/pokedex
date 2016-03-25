app.controller('PokemonController', ['$scope', 'pokemons', function ($scope, pokemons) {
//  pokemons.success(function(data){
//    $scope.pokemons = data;
//  });

        $scope.pokemons = {objects: [
                {name: 'Pokemon_1', types: [{name: 'type_1'}]},
                {name: 'Pokemon_2', types: [{name: 'type_2222'}]},
                {name: 'Pokemon_3', types: [{name: 'type_33'}]},
                {name: 'Pokemon_4', types: [{name: 'type_4'},{name: 'type_33'}]},
                {name: 'Pokemon_5', types: [{name: 'type_1'},{name: 'type_555'}]},
                {name: 'Pokemon_6', types: [{name: 'type_1'}]},
                {name: 'Pokemon_7', types: [{name: 'type_1'},{name: 'type_33'}]},
                {name: 'Pokemon_8', types: [{name: 'type_1'}]},
                {name: 'Pokemon_9', types: [{name: 'type_555'}]},
                {name: 'Pokemon_10', types: [{name: 'type_1'}]},
                {name: 'Pokemon_11', types: [{name: 'type_2'}]},
                {name: 'Pokemon_12', types: [{name: 'type_1'}]},
                {name: 'Pokemon_13', types: [{name: 'type_33'}]},
                {name: 'Pokemon_14', types: [{name: 'type_1'}]},
                {name: 'Pokemon_15', types: [{name: 'type_1'}]},
                {name: 'Pokemon_16', types: [{name: 'type_1'}]},
                {name: 'Pokemon_17', types: [{name: 'type_1'}]},
                {name: 'Pokemon_18', types: [{name: 'type_1'}]},
                {name: 'Pokemon_19', types: [{name: 'type_1'}]},
                {name: 'Pokemon_20', types: [{name: 'type_1'}]},
                {name: 'Pokemon_21', types: [{name:'type_1'}]}
            ]};


        $scope.typeColor = function (typeName) {
            var colors = ['#E16B66', '#A3C98E', '#AF95BB', '#F7D367'];
            return colors[typeName.length % 4];
        };

        $scope.pokemonImage = function (id) {
//      return 'http://pokeapi.co/media/img/'+id+'.png';
            return 'img/favicon.png';
        }
    }]);