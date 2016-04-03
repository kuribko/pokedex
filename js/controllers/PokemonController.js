var chunkSize = 10;

app.controller('PokemonController', ['$scope', 'PokemonsService', 'TypesService', '$http', function ($scope, pokemonsService, typeService, $http) {

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
        }

    };

    $scope.getColorOfType = function (typeName) {
        var colors = ['#E16B66', '#A3C98E', '#AF95BB', '#F7D367'];
        return colors[typeName.length % 4];
    };

    $scope.getPokemonImage = function (id) {
        return 'http://pokeapi.co/media/img/' + id + '.png';
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

        $scope.selectedPokemon.image = $scope.getPokemonImage(id);
    };

    $scope.loadMore = function () {
        listSize += chunkSize;
        loadPokemons();
    }

}]);