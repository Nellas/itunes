var app = angular.module('itunes');

app.service('itunesService', function($http, $q){

    this.getData = function(artist) {
        var dfd = $q.defer();
        $http({
            method: 'JSONP',
            url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
        }).then(function (result) {
            console.log(result);
            var songDataArr = [];
            for (var i = 0; i < result.data.results.length; i++) {
                songDataArr.push({
                    AlbumArt: result.data.results[i].artworkUrl60,
                    Artist: result.data.results[i].artistName,
                    Collection: result.data.results[i].collectionName,
                    CollectionPrice: result.data.results[i].collectionPrice,
                    Play: result.data.results[i].previewUrl,
                    Type: result.data.results[i].kind
                });
            }
            dfd.resolve(songDataArr);
            console.log(songDataArr);
        });
        return dfd.promise;
    };
});

//This service is what will do the 'heavy lifting' and get our data from the iTunes API.
//Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

//Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
//https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
//Note that in the above line, artist is the parameter being passed in.
//You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.