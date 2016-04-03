app.factory('PokemonsService', ['$http', function ($http) {
    var nextChunkUrl = 'http://pokeapi.co/api/v1/pokemon/?limit=' + 12;
    return {
        getPokemons: function (onLoaded) {
            return $http.get(nextChunkUrl)
                .success(function (data) {
                    onLoaded();
                    nextChunkUrl = 'http://pokeapi.co'+data.meta.next;
                    console.log('Pokemons loaded. Next chunk: '+nextChunkUrl);
                    return data;
                })
                .error(function (err) {
                    console.error('Error while loading pokemons: '+err);
                    return err;
                });
        }
    }
}]);
