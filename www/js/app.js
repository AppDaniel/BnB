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
.state("tabs.room", {
  url : "/rooms/:sendID",
  views :{
    "rooms-tab" : {
      controller : "apiCtlr",
      templateUrl : "templates/room.html"
    }
  }
})

  $urlRouterProvider.otherwise("/tab/home");
})

.controller("apiCtlr",function($scope, $http, $state, $rootScope){


  
  $scope.data = {};
  
  $scope.submit = function(){
    
    var url = "http://appdaniel.com/hotel/booking/index.php";
    
    $http.post(url, $scope.data)
    .then(function(response){
      $scope.response = response;
      console.log($scope.response);
    })
    
  };
  
  
  $http({
    method: "GET", 
    url: "http://appdaniel.com/hotel/",
    
    params: {}
    
  }).then(function mySuccess(response) {
    // a string, or an object, carrying the response from the server.
    $scope.rooms = response.data;
    $scope.statuscheck = response.status;
    
    // Denna används för att kolla upp vilket rum  man trycker på, nästa steg
    // $scope.aRoom = $scope.rooms.find(function(item){
      //    console.log(item.id)
      $scope.roomToShow = $state.params.sendID;
      //  return item.id == $stateParams.ID; 
      //})
      
    }, function myError(response) {
      $scope.rooms = response.statusText;
    });
    
    
    
    $scope.nights = function(arravial, depature){
      var arravial = new Date(arravial);
      var depature = new Date(depature);
      var countdays = Math.abs(depature.getTime() - arravial.getTime());
      
      $scope.dayDiff = Math.ceil(countdays / (1000 * 3600 * 24));
      if($scope.dayDiff == 0){
        $scope.dayDiff = 1;
        
      }
      return $scope.dayDiff;
      
    }
    
    //Räkna ut totalpris
    $scope.totalPrice = function(price, nights){
      var price;
      var nights;
      $scope.priceToReturn = price * nights;
      
      return $scope.priceToReturn;
    }

  
    
  })
