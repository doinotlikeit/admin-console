# Overview
This project demonstrates the use of following:

* Vue.js framework to build Javascript applications
* Auth0 SaaS for authentication and authorization, including LinkedIn authentication
* Springboot and Spring for deploying and serving the Vue.js Javascript application

----

# Motivation
* Research and compare modern Javascript UI application frameworks and decide on a framework to create an open source project. I have development AngularJS applications in the past, but wanted to take some time to decide on using AngularJS 2.xx or using an alternative. I research and compared pros and cons of ReactJS, AngularJS 2 and Vue.js and selected Vue.js as the framework to use.

* I also wanted to refresh my Javascript skills, learn ES6 additions like the module system, lear more about NodeJS (import/export, require) as well as build systems like Webpack and Browserfy

* The final piece was on the options of deploying and serving the frontend applications. Using NodeJS and Express, Heroku is one option, but being a huge fan of Springboot, I wanted to explore how a modern Javascript application can be deployed using a Springboot application. The idea is to be able to use all Javascript ecosystem tools during the development and for building a production artifact (minified) using Javascript tools, but be able to integrate artifact with a Springboot application so that it can be deployed and hosted as a JVM application.

* Auth0 takes away the pain of authentication, authorization, user management (registration, password reset) and you can use their hosted services as a SaaS solution. There many other things Auth0 provides including SSO, social media integration (for OAuth authentication). I wanted to explore the use of Auth0 and specifically using it with Vue.js
