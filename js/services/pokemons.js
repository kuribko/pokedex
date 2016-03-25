app.factory('pokemons', ['$http', function($http){
	return $http.get('http://pokeapi.co/api/v1/pokemon/?limit=12')
		.success(function(data){
			return data;
		})
		.error(function(err){
			return err;
		});
}]);