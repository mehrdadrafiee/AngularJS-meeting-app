myApp.controller('MeetingsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',
 function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

   var ref = new Firebase(FIREBASE_URL);
   var auth = $firebaseAuth(ref);

   //on Auth
   auth.$onAuth(function(authUser) {
     //User Authenticated
     if (authUser) {
       var meetingsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/meetings');
       var meetingsInfo = $firebaseArray(meetingsRef);

       //Add meetings
       $scope.addMeeting = function() {
         meetingsInfo.$add({
           name: $scope.meetingname,
           date: Firebase.ServerValue.TIMESTAMP
           //promise
         }).then(function() {
           $scope.meetingname = '';
         });
       }
     }
   });

}]);
