const express = require('express')
const router = express.Router()
const {sendToLogin, restoreUser } = require('../utils/auth')
// //Add a XSRF-TOKEN cookie to allow any developer to re-set the CSRF token cookie XSRF-TOKEN
// router.get('/api/csrf/restore', (req, res) => {
//     //set a cookie on the response with the name of XSRF-TOKEN to the valuie of the req.csrfToken method's return
//     const csrfToken = req.csrfToken();
//     //then send the token as the response for easy retrival
//     res.cookie("XSRF-TOKEN", csrfToken);
//     res.status(200).json({
//         'XSRF-Token': csrfToken
//     });
// });


//import the api/index.js and connect it to the router. This middleware works by routing every '/api' url to the apihandler in the routes/api/index.js

const apiRouter = require('./api');
router.use('/api', apiRouter);
// Apply sendToLogin middleware to all routes
router.use(restoreUser, sendToLogin);

const webRouter = require('./web');
router.use('/', webRouter)





module.exports = router
