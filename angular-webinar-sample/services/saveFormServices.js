
angular.module('SaveFormServices', ['ngResource'])
    .factory('FormService', function ($http,$location) {
      return {

        save: function (userData) {
          return $http({
            method: 'POST',
            url: 'http://localhost:8085/api/userForm',
            data: JSON.stringify(userData)
          }).success(function (data, status, headers, config) {
            console.log('DATA:'+ data);
            console.log('status:'+status);
            console.log('Header'+headers);
            console.log('Config:'+config);
            alert('WoW...!!! You Have Submited Form Data to MongoDB SuccessFull!!!!..Well Done...Keep..It..Up');


          }).error(function (data, status, headers, config) {
            console.log('DATA:' + data);
            console.log('status:' + status);
            console.log('Header' + headers);
            console.log('Config:' + config);
			alert("Error occurred..!try again...!!!!");
          })

        },
		get: function () {
		return $http({
        method: 'GET',
        url: 'http://localhost:8085/api/allUserData'
        }).success(function (data){
        alert(data);
        }).error(function (data, status, headers, config) {
            console.log('DATA:' + data);
            console.log('status:' + status);
            console.log('Header' + headers);
            console.log('Config:' + config);
			alert("Unable to fetch Data..!!Error occurred..!try again...!!!!");
          })
		}
      }

    });


  