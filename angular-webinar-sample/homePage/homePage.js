angular.module('sample.homePage', [
  'ui.router'
])
.config(function($stateProvider) {
  $stateProvider
    .state('auth.homePage', {
      url: '/HomePage',
      controller: 'mainController',
      templateUrl: 'homePage/HomePage.html'
    });
})
.controller('mainController', function mainController($scope, FormService) {

      $scope.user = {};
      // function to submit the form after all validation has occurred			
      $scope.submitForm = function () {

        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
          console.log($scope.user);
          console.log('Submiting!!!!!!!!!!!');
		  console.log("$pristine = " + $scope.userForm.$pristine);
		  $scope.userForm.$setPristine();
		  console.log("$pristine = " + $scope.userForm.$pristine);
          FormService.save($scope.user);
          FormService.get();

          $scope.user.candidatename = null;
          $scope.user.projectname = null;
          $scope.user.practiceArea = null;
          $scope.user.requester = null;
          $scope.user.interviewername = null;
          $scope.user.signature = null;
          $scope.user.date = null;
          $scope.user.skillsReff1 = [];
          $scope.user.skillsReff2 = [];
          $scope.user.comments = null;
		
          
        }

      };
    }).controller('MSController', function ($scope) {
    $scope.user.skillsReff1 = [];
    
    var defaultForm = {
        skillname: "",
        jrssRating: "",
        interviewerRating: ""
    };
    $scope.addSkills = function (reff) {
        //	    var skill = {
        //	      skillname: $scope.name,
        //	      jrssRating: $scope.jrssrating,
        //	      interviewerRating: $scope.interviewrating


        //	    };
        $scope.user.skillsReff1.push(reff);
        console.log(reff);
        $scope.reff1 = angular.copy(defaultForm);
    }

}).controller('OPController', function ($scope) {
	    $scope.user.skillsReff2 = [];
	   
	  var defaultForm = {
	    skillname: "",
	    jrssRating: "",
	    interviewerRating: ""
	  };
	  $scope.addSkills = function (reff) {
	    //	    var skill = {
	    //	      skillname: $scope.name,
	    //	      jrssRating: $scope.jrssrating,
	    //	      interviewerRating: $scope.interviewrating


	    //	    };
	    $scope.user.skillsReff2.push(reff);
	    console.log(reff);
	    $scope.reff2 = angular.copy(defaultForm);
	  }

	});
