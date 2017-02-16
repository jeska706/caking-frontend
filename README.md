#Caking

![mainbanner](https://cloud.githubusercontent.com/assets/22794560/23006529/b233e1e2-f3bf-11e6-851d-d2c10b2854dc.jpg)


<hr>

This project is the idea I came to General Assembly with. It's not fully functional but once completed it will be a full CRUD cake inspiration application.
-   [Live site](https://caking.herokuapp.com/), buggy issues due to imgur
-   [Backend Repo site](https://github.com/jeska706/caking-app-backend)
-   [hosted link](https://caking-api.herokuapp.com/)

##Project Inspiration/Theme
![theme](https://cloud.githubusercontent.com/assets/22794560/23006155/6d855c80-f3bd-11e6-950a-715dff08d735.jpg)
![splash](https://cloud.githubusercontent.com/assets/22794560/23004936/9e76c7fe-f3b6-11e6-8793-fc703be157de.jpg)



##User's Stories
-   When a user linked to the page they have the option to create and account, login, or go straight to the cake gallery.
-   If an account is created a "user's page" will show. Once signed in a user can add cakes to the gallery, logout, and delete their account.


##Future features:
-   A user can create a cake design, edit the design, save it to their own gallery, and or send it to a bakery.
-   A user view their gallery, edit their gallery, delete design off their gallery
-   Add cake to users gallery
-   Create a cake design, save a cake design, email a cake design
-   google maps api for bakery search
-   Auto refresh on data


##Technologies Used
-   HTML/CSS/JS
-   AngularJS
-   PostgreSQL
-   Ruby on Rails
-   NodeJS & Express
-   Bootstrap/ Sass
-   CORS/Authentication with JWT


##Creation Canvas
[Creation Canvas](https://github.com/jeska706/canvasSVG), which was adapted from [LisaBee224](https://github.com/LisaBee224/coloring_book).
<img width="629" alt="screen shot 2017-02-15 at 9 31 51 pm" src="https://cloud.githubusercontent.com/assets/22794560/23007508/5cebe6e2-f3c6-11e6-8505-96ea83b0d7d7.png">
-   I spent a lot of time researching and developing a cake design canvas, which works perfectly outside of the app, but have not been able to include it currently.


##Issues & Bugs
-   Once cake is created unshift function breaks code so page needs to be refreshed to show new added cakes.

-   I set this app up with the intention of having the /cakes route only work as a show route and a separate route was created to store creations into a users gallery from the canvas. Unfortunately, since the canvas/creations route isn't set up I had to merge the added cakes to the /cakes route alone. This created a trickle down effect and hindered my other needed CRUD features.
