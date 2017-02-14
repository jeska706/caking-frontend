console.log("Connect app.js");

var app = angular.module('cakinItApp', []);
//"ngInfiniteScroll"


//-----------Main Controller----------------
app.controller('mainController', ['$http', function($http){
    var controller = this;
    this.url = 'http://localhost:3000'
    this.user = {};
    this.users = [];
    this.userPass = {};
    this.registeredPass = {};
    this.welcome = "Welcome to Caking, ";
    this.wrongMessage = "Nope, Try Again!";
    this.newCreations = {};
    this.myGallery = {};
    this.toCreation = "canvas/index.html"

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
    //---------Get current user----------
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
    //----------------Logout--------------
    this.logout = function(){
        this.loggedIn = false;
        localStorage.clear('token');
        this.currentUser = {};
        location.reload();
    }


    //--------------Delete User-------------

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
    //
    //Not working but I think this is the preferred route

    // this.creation = function(){
    //     console.log("create route");
    //
    //     $http({
    //         method: "POST",
    //         url: controller.url + "/users/" + this.user.id + "/creations/",
    //         headers: {
    //             Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    //         },
    //         data: {
    //             title: this.title,
    //             user_id: this.user.id
    //             //,
    //             //cake: '/cakes/'
    //         }
    //     }).then(function(res){
    //         console.log(res);
    //         this.newCreations = res.data;
    //         console.log(this.newCreations);
    //     }.bind(this));
    // }


    //-------------Gallery---------------------


    //------------Cake Hit--------------
    $http({
        method: 'GET',
        url: controller.url + '/cakes'

    }).then(function(res){
        console.log(res);
        // console.log('this is this: ', controller);
        controller.cakes = res.data;
        console.log(controller.cakes);
    },function(res){
        controller.err = res.data;
        console.log(controller.err);
    }.bind(this));


    // 
    // this.newCake = {};
    // this.addACake = function(newCake){
    //     console.log("create route");
    //     console.log(this.newCake);
    //     $http({
    //         method: "POST",
    //         url: controller.url + "/users/" + this.user.id + '/creations',
    //         headers: {
    //             Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    //         },
    //         data: {
    //             creation: {
    //                 title: newCake.title,
    //                 user_id: this.user.id,
    //                 cake_id: newCake.id,
    //                 img: newCake.img,
    //                 tags: newCake.description,
    //                 description: newCake.description,
    //             }
    //         }
    //     }).then(function(res){
    //         console.log(res);
    //         this.newCake = res.data
    //         this.newCake.title = res.data.title;
    //         console.log(this.newCake.title);
    //
    //         this.userGallery = {};
    //         this.toGallery = function(){
    //             console.log("gallery route");
    //             $http({
    //                 method: "GET",
    //                 url: controller.url + "/users/" + this.user.id + '/creations/'
    //             }).then(function(res){
    //                 console.log(res);
    //                 this.userGallery = res.data;
    //             }.bind(this));
    //         }
    //     }.bind(this));
    // }



//   This route works but pushes into the cakes array so full array shows on /cakes
    this.newCake = {};
    this.addACake = function(newCake){
        console.log("create route");
        console.log(this.newCake);
        $http({
            method: "POST",
            url: controller.url + "/users/" + this.user.id + "/creations/" + this.creation_id + "/cakes",
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            data: {
                title: newCake.title,
                img: newCake.img,
                description: newCake.description
            }
        }).then(function(res){
            console.log(res);
            this.newCake = res.data
            this.newCake.title = res.data.title;
            console.log(this.newCake.title);

            this.userGallery = {};
            this.toGallery = function(){
                console.log("gallery route");
                $http({
                    method: "GET",
                    url: controller.url + '/users/' + this.user.id + '/creations/' + this.creation_id + '/cakes'
                }).then(function(res){
                    console.log(res);
                    this.userGallery = res.data;
                }.bind(this));
            }

        }.bind(this));

    }


    //------------Gallery--------------------

    // this.userGallery = {};
    // this.toGallery = function(userGallery){
    //     console.log(this.userGallery);
    //     console.log("gallery route");
    //     $http({
    //         method: "GET",
    //         url: controller.url + '/users/' + this.user.id + '/creations/' + this.creation_id + '/cakes',
    //
    //     }).then(function(res){
    //         console.log(res);
    //         this.userGallery = res.data;
    //     }.bind(this));
    // }
    // //---------------ADD A CAKE---------------
    // this.newCake = {};
    // this.addACake = function(newCake){
    //     console.log("create route");
    //     console.log(this.newCake);
    //     $http({
    //         method: "POST",
    //         url: controller.url + "/users/" + this.user.id + "/creations" ,
    //         headers: {
    //             Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    //         },
    //         data: {
    //             cake:  {
    //                 title: newCake.title,
    //                 img: newCake.img,
    //                 description: newCake.description
    //             }
    //         }
    //     }).then(function(res){
    //         console.log(res);
    //         this.newCake = res.data
    //         this.newCake.title = res.data.title;
    //         console.log(this.newCake.title);
    //     }.bind(this));

    //---------------Edit User---------------
    // this.newUsername = {};
    // this.editUser = function(newUsername){
    //     console.log('edit route');
    //     console.log(newUsername);
    //     $http({
    //         method: 'PUT',
    //         url: controller.url + "/users/" + this.user.id,
    //         data: { username: newUsername.username }
    //         // headers: {
    //         //     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    //         // }
    //     }).then(function(res){
    //         console.log(res);
    //         // this.newUsername = res.data
    //     }.bind(this));
    // }

}]);//------End of Main Controller----------
