
angular.module('SaveFormServices', ['ngResource'])
    .factory('FormService', function ($http,$location) {
      return {

        save: function (userData) {
          return $http({
            method: 'POST',
            url: 'http://localhost:57370/api/Test',
            data: JSON.stringify(userData)
          }).success(function (data1, status, headers, config) {
			$http({
        method: 'GET',
        url: 'http://localhost:57370/api/Test'
        }).success(function (data){
        alert(data);
        }).error(function (data, status, headers, config) {
            console.log('DATA:' + data);
            console.log('status:' + status);
            console.log('Header' + headers);
            console.log('Config:' + config);
			alert("Unable to fetch Data..!!Error occurred..!try again...!!!!");
          });
            console.log('DATA:'+ data1);
            console.log('status:'+status);
            console.log('Header'+headers);
            console.log('Config:'+config);
            alert('WoW...!!! You Have Submited Form Data to MongoDB SuccessFull!!!!..Well Done...Keep..It..Up');
			alert(data1);


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
        url: 'http://localhost:57370/api/Test'
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


  