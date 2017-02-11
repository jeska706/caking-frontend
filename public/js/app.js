console.log("Connect app.js");

var app = angular.module('cakinItApp', []);
//"ngInfiniteScroll"


//-----------Main Controller----------------
app.controller('mainController', ['$http', function($http){
    // this.message = "Main controller connected"
    var controller = this;
    // console.log(controller);
    this.url = 'http://localhost:3000'
    this.user = {};
    this.users = [];
    this.userPass = {};
    this.registeredPass = {};
    this.welcome = "Welcome to Caking, ";
    this.wrongMessage = "Nope, Try Again!";
    this.newCreations = {};
    this.myGallery = {};

    //----------Register---------------
    this.registered = false;
    this.register = function(registeredPass){
        $http({
            method: 'POST',
            url: controller.url + "/users",
            data: { username: registeredPass.username, password: registeredPass.password }
        }).then(function(res){
            console.log('this is registered res: ', res)
            this.registered = true;
            this.aUsersPass = {};
        }.bind(this));
    }



    //-----------Login----------------
    this.loggedIn = false;
    this.wrong = false;
    //set up hide login, register modal on login
    this.login = function(userPass) {
        console.log(userPass);
        $http({
            method: 'POST',
            url: controller.url + '/users/login',
            data: { username: userPass.username, password: userPass.password },
        }).then(function(res){
            // console.log(controller);
            console.log('this is the login res : ',res);
            this.user = res.data.user;
            console.log(this.user);
            if (res.data.status == 401){
                this.error = "Unauthorized";
                console.log(this.error);
                this.wrong = true;

            }else{
                this.users = res.data;
                this.wrong = false;
                console.log(res.data);
                this.currentUser = this.user
                // console.log(this.currentUser);
            }
            localStorage.setItem('token', JSON.stringify(res.data.token));
            this.loggedIn = true;
            this.userPass = {};
        }.bind(this));
    }

    this.getUsers = function() {
        $http({
            method: 'GET',
            url: controller.url + '/users',
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(res) {
            console.log(res);
        }.bind(this));
    }

    this.logout = function(){
        this.loggedIn = false;
        localStorage.clear('token');
        this.currentUser = {};
        location.reload();
        // this.currentUser = {};
        // console.log(this.currentUser);
    }
    //---------------Edit User---------------
    this.editUser = function(){
        console.log('edit route');
        $http({
            method: 'PUT',
            url: controller.url + "/users/" + this.user.id,
            data: this.newUser
            // headers: {
            //     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            // }
        }).then(function(res){
            console.log(res)
            this.user = res.data
        }.bind(this));
    }

    //--------------Delete User----------

    this.deleteUser = function(){

        console.log('delete route');
        $http({
            method: 'DELETE',
            url: controller.url + "/users/" + this.user.id,
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(res){
            console.log(res)
            this.logout();
        }.bind(this));
    }

    //------------Creation route--------

    this.creation = function(){
        console.log("create route");

        $http({
            method: "POST",
            url: controller.url + "/users/" + this.user.id + "/creations/",
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            data: {
                title: this.title,
                user_id: this.user.id
                //,
                //cake: '/cakes/'
            }
        }).then(function(res){
            console.log(res);
            this.newCreations = res.data;
            console.log(this.newCreations);
        }.bind(this));
    }
    //-------------Gallery---------------------
    this.gallery = function(){
        console.log("Gallery route");

        $http({
            method: 'GET',
            url: controller.url + '/galleries/',
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            }
        }).then(function(res){
            console.log(res.data);
            this.myGallery = res.data;
            this.cake = res.data.title;
            this.img = res.data.img;
        },function(res){
            controller.err = res.data;
            console.log('this is a gallery error: ', controller.err);
        }.bind(this));
    }

    //------------Cake Hit--------------
    $http({
        method: 'GET',
        url: this.url + '/cakes'
        //,
        // headers: {
        //     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        // },
        // data: this.cake

    }).then(function(res){
        // console.log(res);
        // console.log('this is this: ', controller);
        controller.cakes = res.data;
        // console.log(controller.cakes);
    },function(res){
        controller.err = res.data;
        console.log(controller.err);
    }.bind(this));


}]);//------End of Main Controller----------
