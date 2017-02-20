# The O.V.E.N.
## Order Verification and Export Network

## What is it?
The O.V.E.N is a modern web application built for Breadsmith MN to better organize their commercial business orders.

The application is accessed through either the customer portal or the administrator portal. Users must authenticate using an email address that supports Google OAuth, which must be registered in the application database as either a customer contact or an administrator (both added by an existing administrator).

## Build
### Requirements
The O.V.E.N. requires a version of Node.js that supports ES6 promises and arrow function syntax and a database that supports SQL. It was developed and tested on Node.js version 7.4.0 and PostgreSQL version 9.6.1. The front end of the application was tested on Google Chrome version 56 and Safari version 10.0.2.

### Installation instructions:
1. `git clone` or download the repository
2. `npm install` to get dependencies
3. `npm postinstall` to create database tables. A `DATABASE_URL` environment variable pointing to the desired database is required
4. Additional environment variables required are:
    * `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL` for Firebase authentication
    * `MAIL_SERVICE` (e.g. `'gmail'`), `MAIL_USER`, `MAIL_PASS` to send emails
4. `npm start` to run the app on port 3000 or the environment variable `PORT` if present

## Technologies Used:
* AngularJS
* Node.js
* Express.js
* PostgreSQL
* Firebase
* Bootstrap

## Additional Dependencies:
* Knex.js
* Moment.js
* json2csv
* Papa Parse
* Nodemailer
* Node Schedule
