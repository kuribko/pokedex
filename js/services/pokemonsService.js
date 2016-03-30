app.factory('pokemonsService', ['$http', function ($http) {

    return {
        getPokemons: function (itemsLimit, onLoaded) {
            return $http.get('http://pokeapi.co/api/v1/pokemon/?limit=' + itemsLimit)
                .success(function (data) {
                    //console.log('Loaded');
                    onLoaded();
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        }
    }
}]);