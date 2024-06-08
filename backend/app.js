const express = require('express');
require('express-async-errors');  //auto handles aync errors

const morgan = require('morgan'); //to log in data from the requests: method, url, statuscode, time it took, content length

const cors = require('cors');
// const csurf = require('csurf');
const helmet = require('helmet');

const cookieParser = require('cookie-parser');

const path =require('path')

const { enviroment } = require('./config');
const isProduction = enviroment === 'production'; // this will be true if the enviroment in config/index.js is set to production. otherwise e.g. if we are in development it will be false

const app = express();

app.use(morgan('dev')); //dev is a format that morgan has which provides the followinginformation method: GET url: / statuscode: 200 loadingtime: in ms contentLength: 12
app.use(cookieParser()) // for parsing cookies
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // parses body of request into json


//if we are in development or testing a.k.a not inProduction. use cors as security middleware
if (!isProduction) {
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
// app.use(
//     helmet.crossOriginResourcePolicy({
//         policy: "cross-origin"
//     })
// );

// Set the _csrf token and create req.csrfToken method
//ADD THE CSURF MIDDLEWARE AND CONFIGURE TO USE COOKIES

// app.use(
//     csurf({
//         cookie: {
//             securo: isProduction,
//             sameSite: isProduction && "Lax",
//             httpOnly: true
//         }
//     })
// );

/*The `csurf` middleware will add a `_csrf` cookie that is HTTP-only (can't be
read by JavaScript) to any server response. It also adds a method on all
requests (`req.csrfToken`) that will be set to another cookie (`XSRF-TOKEN`)
later on. These two cookies work together to provide CSRF (Cross-Site Request
Forgery) protection for your application. The `XSRF-TOKEN` cookie value needs to
be sent in the header of any request with all HTTP verbs besides `GET`. This
header will be used to validate the `_csrf` cookie to confirm that the
request comes from your site and not an unauthorized site.
 */

//------------------------END OF PRE-REQUEST MIDDLEWARE--------------------------------//


// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

const routes = require('./routes'); //import to add the routes
app.use(routes) // connect all the routes


//ERROR HANDLER 404
//this first one created the error and forwards it to the middleware handler
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

//Sequelize VALIDATOR ERROR CREATER:
//purpose: to catch sequelize errors and format them before sending the error response
const { ValidationError } = require('sequelize');
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) { //if true, this is a validation error from the sequelize package
        let errors = {} //create errors object
        for (let error of err.errors) { //add
            errors[error.path] = error.message //path is the field that triggered the error. it's SETTING the KEY (err.path e.g. email:) VALUE (err.message = 'email bla bla') pairs inside the errors object that we just created to be sent in the repsonse
        }
        err.title = 'Validation error';
        err.errors = errors //adds the object to the errors key of the error response
    }
    next(err);
});

//FINAL ERROR FORMATER and response
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Internal Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack // isProduction = true? then set to null : else: send the stack trace only if we are in development
    });
});

module.exports = app;
