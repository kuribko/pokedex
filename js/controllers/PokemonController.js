app.controller('PokemonController', ['$scope', 'pokemonsService', '$http', function ($scope, pokemonsService, $http) {
    pokemonsService.success(function (data) {
        $scope.pokemons = data;
    });

    //$scope.pokemons = {objects: [
    //        {name: 'Pokemon_1', pkdx_id: 1, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_2', pkdx_id: 2, types: [{name: 'type_2222'}]},
    //        {name: 'Pokemon_3', pkdx_id: 3, types: [{name: 'type_33'}]},
    //        {name: 'Pokemon_4', pkdx_id: 4, types: [{name: 'type_4'}, {name: 'type_33'}]},
    //        {name: 'Pokemon_5', pkdx_id: 5, types: [{name: 'type_1'}, {name: 'type_555'}]},
    //        {name: 'Pokemon_6', pkdx_id: 6, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_7', pkdx_id: 7, types: [{name: 'type_1'}, {name: 'type_33'}]},
    //        {name: 'Pokemon_8', pkdx_id: 8, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_9', pkdx_id: 9, types: [{name: 'type_555'}]},
    //        {name: 'Pokemon_10', pkdx_id: 10, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_11', pkdx_id: 11, types: [{name: 'type_2'}]},
    //        {name: 'Pokemon_12', pkdx_id: 12, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_13', pkdx_id: 13, types: [{name: 'type_33'}]},
    //        {name: 'Pokemon_14', pkdx_id: 14, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_15', pkdx_id: 15, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_16', pkdx_id: 16, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_17', pkdx_id: 17, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_18', pkdx_id: 18, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_19', pkdx_id: 19, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_20', pkdx_id: 20, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_21', pkdx_id: 21, types: [{name: 'type_1'}]}
    //    ]};


    $scope.typeColor = function (typeName) {
        var colors = ['#E16B66', '#A3C98E', '#AF95BB', '#F7D367'];
        return colors[typeName.length % 4];
    };

    $scope.pokemonImage = function (id) {
//      return 'http://pokeapi.co/media/img/'+id+'.png';
        return 'img/favicon.png';
    }

    $scope.selectedPokemon = {image: ''};

    $scope.selectPokemon = function (id) {
        console.log("pokemon selected: " + id);

        $http({
            method: 'GET',
            url: 'http://pokeapi.co/api/v1/pokemon/' + id
        }).then(function successCallback(response) {
            $scope.selectedPokemon = response.data;
        }, function errorCallback(response) {
            $scope.selectedPokemon = response;
        });

//            $scope.selectedPokemon = $scope.pokemons.objects[id];

        $scope.selectedPokemon.image = $scope.pokemonImage(id);

    };
}]);