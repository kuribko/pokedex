app.factory('pokemonsService', ['$http', function ($http) {

    return {
        getPokemons: function (itemsLimit) {
            return $http.get('http://pokeapi.co/api/v1/pokemon/?limit=' + itemsLimit)
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        }
    }
}]);