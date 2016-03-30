var chunkSize = 10;

app.controller('PokemonController', ['$scope', 'pokemonsService', 'typeService', '$http', function ($scope, pokemonsService, typeService, $http) {

    var listSize = chunkSize;
    var pokemons = [];
    var isLoadingPokemons = false;
    var typeAll = {name: 'All types'};
    $scope.selectedPokemonType = typeAll;

    console.log('Loading pokemon types');
    typeService.success(function (data) {
        $scope.pokemonTypes = [typeAll].concat(data.objects);
    })

    var loadPokemons = function () {
        if (isLoadingPokemons) {
            return;
        }
        isLoadingPokemons = true;
        var $button = $('#load-more-button');
        $button.toggleClass('loading');
        $button.text('Loading...');
        var onLoadCallback = function () {
            isLoadingPokemons = false;
            $button.toggleClass('loading');
            $button.text('Load More');
        }

        console.log('Loading pokemons');
        pokemonsService.getPokemons(onLoadCallback).success(function (data) {
            if ($scope.selectedPokemonType !== typeAll && filterByType(data.objects, $scope.selectedPokemonType).length === 0) {
                alert('New chunk of data loaded doesn\'t contain any items matching current filter. Try loading more or switch to \'All types\' to see full list of items');
            }
            pokemons = pokemons.concat(data.objects);
        });
    }

    loadPokemons();

    var filterByType = function (pokes, type) {
        var selectedTypeName = type.name.toLowerCase();
        var result = [];
        for (var i in pokes) {
            var poke = pokes[i];
            for (var j in poke.types) {
                if (poke.types[j].name.toLowerCase() === selectedTypeName) {
                    result.push(poke);
                    break;
                } else {
                    console.log(poke.types[j].name.toLowerCase() + '!==' + selectedTypeName);
                }
            }
        }
        return result;
    }

    $scope.getPokemons = function () {
        if ($scope.selectedPokemonType === typeAll) {
            console.log('Showing all pokemons');
            return pokemons;
        } else {
            var selectedTypeName = $scope.selectedPokemonType.name.toLowerCase();
            console.log('Showing "' + selectedTypeName + '" pokemons');

            return filterByType(pokemons, $scope.selectedPokemonType);
            //var result = [];
            //for (var i in pokemons) {
            //    var poke = pokemons[i];
            //    console.log("searching in " + poke);
            //    for (var j in poke.types) {
            //        if (poke.types[j].name.toLowerCase() === selectedTypeName) {
            //            result.push(poke);
            //            break;
            //        } else {
            //            console.log(poke.types[j].name.toLowerCase() + '!==' + selectedTypeName);
            //        }
            //    }
            //}
            //return result;
        }
    };

    //pokemons = {objects: [
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
    //        //{name: 'Pokemon_20', pkdx_id: 20, types: [{name: 'type_1'}]},
    //        {name: 'Pokemon_21', pkdx_id: 21, types: [{name: 'type_1'}]}
    //    ]};


    $scope.getColorOfType = function (typeName) {
        var colors = ['#E16B66', '#A3C98E', '#AF95BB', '#F7D367'];
        return colors[typeName.length % 4];
    };

    $scope.getPokemonImage = function (id) {
        return 'http://pokeapi.co/media/img/' + id + '.png';
        //return 'img/favicon.png';
    }

    $scope.selectedPokemon = {image: ''};

    $scope.onSelectPokemon = function (id) {
        console.log("pokemon selected: " + id);
        $scope.selectedPokemon = {name: "Loading..."};
        $http({
            method: 'GET',
            url: 'http://pokeapi.co/api/v1/pokemon/' + id
        }).then(function successCallback(response) {
            $scope.selectedPokemon = response.data;
        }, function errorCallback(response) {
            $scope.selectedPokemon = response;
        });

        //$scope.selectedPokemon = pokemons.objects[id];

        $scope.selectedPokemon.image = $scope.getPokemonImage(id);
    };

    $scope.loadMore = function () {
        listSize += chunkSize;
        loadPokemons();
    }

    //$scope.pokemonTypes = ['All', 'fire', 'water', 'normal'];
    $scope.filterByType = function () {
        console.log('selected type: ' + $scope.selectedPokemonType.name);
    }
}]);