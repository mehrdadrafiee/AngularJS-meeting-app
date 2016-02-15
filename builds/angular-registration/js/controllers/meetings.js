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
       $scope.meetings = meetingsInfo;

       //Make sure that meeting data is loaded
       meetingsInfo.$loaded().then(function(data){
         $rootScope.howManyMeetings = meetingsInfo.length;
       });

       meetingsInfo.$watch(function(data) {
         $rootScope.howManyMeetings = meetingsInfo.length;
       });

       //Add meetings
       $scope.addMeeting = function() {
         meetingsInfo.$add({
           name: $scope.meetingname,
           date: Firebase.ServerValue.TIMESTAMP
           //promise
         }).then(function() {
           $scope.meetingname = '';
         });
       };
       //Delete meeting
       $scope.deleteMeeting = function(key) {
         meetingsInfo.$remove(key);
       };
     }
   });

}]);
