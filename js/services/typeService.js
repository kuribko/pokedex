app.factory('typeService', ['$http', function ($http) {

    return $http.get('http://pokeapi.co/api/v1/type/?limit=999')
        .success(function (data) {
            console.log('Pokemon types loaded');
            return data;
        })
        .error(function (err) {
            console.error('Error while loading pokemon types' + err);
            return err;
        });
}]);