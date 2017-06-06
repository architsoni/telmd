'use strict';

/**
 * 0.1.1
 * Deferred load js/css file, used for ui-jq.js and Lazy Loading.
 * 
 * @ flatfull.com All Rights Reserved.
 * Author url: http://themeforest.net/user/flatfull
 */

angular.module('ui.api', [])
	.service('api', ['$http', '$q', function ($http, $q) {

	    var api = {};

	    api.getCheckIns = function () {
	        var deferred = $q.defer();
	        $http({
	            method: 'GET',
	            url: 'https://telmd-8980d.firebaseio.com/CheckIns.json'
	        })
            .then(function (response) {
                deferred.resolve(response.data);
            })
            .catch(function (error) {
                console.log("Get CheckIns service failed");
                deferred.reject(error);
            });

	        return deferred.promise;
	    }

	    api.getPractitioners = function () {
	        var deferred = $q.defer();
	        $http({
	            method: 'GET',
	            url: 'https://telmd-8980d.firebaseio.com/Practitioners.json'
	        })
            .then(function (response) {
                deferred.resolve(response.data);
            })
            .catch(function (error) {
                console.log("Get CheckIns service failed");
                deferred.reject(error);
            });

	        return deferred.promise;
	    }

	    api.signUp = function (params) {
	        return firebase.auth()
                  .createUserWithEmailAndPassword(params.email, params.password);

	        //.createUserWithEmailAndPassword(params.email, params.password);
	        //  firebase.auth().sendEmailVerification()
	    }

	    api.saveImage = function (value) {
	        var storageRef = firebase.storage().ref();
	        var imagesRef = storageRef.child('images/');
	        return imagesRef.putString(value.fileData, 'data_url');
	    }

	    api.setRef = function (key, value) {
	        var userRef = firebase.database().ref('Users/' + key);
	        userRef.child('detail').set(value);
	    }

	    api.getRef = function (key) {
	        var userRef = firebase.database().ref('users/' + key);
	        userRef.on("value", function (snapshot) {
	            var value = {};
	            snapshot.forEach(function (data) {
	                value = JSON.stringify(data.val());
	                value = (JSON.parse(value))
	            });
	            return value;
	        });
	    }

	    api.getCheckInByUserId = function (key) {
	        var ref = firebase.database().ref("CheckIns");
	        return ref.orderByChild("user").equalTo(key).limitToLast(1);
	    }

	    api.getCheckInList = function (key) {
	        var ref = firebase.database().ref("CheckIns");
	        return ref.orderByChild("user").equalTo(key);
	    }

	    api.sendPasswordResetEmail = function (params) {
	        return firebase.auth().sendPasswordResetEmail(params)
	    }

	    api.signIn = function (params) {
	        return firebase.auth()
                  .signInWithEmailAndPassword(params.email, params.password)
	    }

	    api.signOut = function () {
	        firebase.auth().signOut().then(function () {
	            console.log('Signed Out');
	        }, function (error) {
	            console.error('Sign Out Error', error);
	        });
	    }

	    return api;
	}]);