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

.controller("apiCtlr",function($scope, $http, $state, $ionicModal){




  
  $scope.data = {
    adult: 1,
    child : 0
  };
  
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
    
    $scope.today = new Date()
    
    $scope.nights = function(arravial, depature){
      var arravial = new Date(arravial);
      var depature = new Date(depature);
      var countdays = Math.abs(depature.getTime() - arravial.getTime());

   		        
      $scope.datePrettyIn = arravial.toLocaleDateString();
      $scope.datePrettyOut = depature.toLocaleDateString();
      
      $scope.dayDiff = Math.ceil(countdays / (1000 * 3600 * 24));
      if($scope.dayDiff == 0){
        $scope.dayDiff = 1;
        
      }
      return $scope.dayDiff;
      
    }
    
    $scope.totalPrice = function(price, nights){
      var price;
      var nights;
      $scope.priceToReturn = price * nights;
      
      return $scope.priceToReturn;
    }

    $scope.maxChild = function(maxVisitor, adult){
      var adult;
      var maxVisitor;
      $scope.childToReturn = maxVisitor - adult;

      return $scope.childToReturn;

    };

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
  })

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  
        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })