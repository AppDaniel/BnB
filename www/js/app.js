angular.module('bnb', ['ionic'])

// Lägg till denna metod för att visa flikarna längst ner på Android.
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.platform.android.tabs.position("bottom");
 })

.config(function($stateProvider, $urlRouterProvider){

$stateProvider
.state("tabs" , {
  url : "/tab" ,
  abstract:true,
  templateUrl : "templates/tabs.html"
})

.state("tabs.home" , {
  url : "/home" ,
  views : {
    "home-tab" : {
      templateUrl : "templates/home.html"
    }
  }
})

.state("tabs.rooms" , {
  url : "/rooms" ,
  views : {
    "rooms-tab" : {
      controller : "apiCtlr",
      templateUrl: "templates/rooms.html"
    }
  }
})
.state("tabs.info" , {
  url : "/info" ,
  views : {
    "info-tab" : {
      templateUrl: "templates/info.html"
    }
  }
})

  $urlRouterProvider.otherwise("/tab/home");
})

.controller("apiCtlr",function($scope, $http, $stateParams){


  $http({
    method: "GET", 
    url: "http://appdaniel.com/hotel/",
    
    params: {}
  
  }).then(function mySuccess(response) {
      // a string, or an object, carrying the response from the server.
      $scope.rooms = response.data;
      $scope.statuscheck = response.status;
  
     /* Denna används för att kolla upp vilket rum  man trycker på, nästa steg
     $scope.aRoom = $scope.rooms.find(function(item){
        console.log(item.room_ID)
       $scope.roomToShow = $stateParams.ID;
        return item.id == $stateParams.ID; 
      })*/
  
    }, function myError(response) {
      $scope.rooms = response.statusText;
  });
  
  })
