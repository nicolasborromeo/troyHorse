const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const { Op } = require('sequelize')
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, restoreUser } = require('../../utils/auth')


const validateLogin = [
    check('username')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Please provide a valid username'),
    check('password')
        .exists({checkfalse: true})
        .notEmpty()
        .withMessage('Please provide a valid password'),
    handleValidationErrors
]


router.post('/', validateLogin, async (req, res, next) => {

    const { username, password } = req.body;
    // console.log('REQ BODY',req.body)
    const user = await User.unscoped().findOne({
        where: {username: username}
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        let error = new Error('Log In Failed');
        error.title = 'Login failed';
        error.message = 'Invalid Credentials'
        error.status = 401;
        error.errors = { credentials: 'The provided credentials were invalid.' }
        return next(error)
    };

    let safeUser = {
        id: user.id,
        email: user.email,
        username: user.username
    };

    setTokenCookie(res, safeUser);

    res.json({
        user: safeUser
    });
});


router.get('/', restoreUser, async (req, res, _next) => {
    res.status(200).json(req.user)
});


router.delete('/', async (_req, res) => {
    res.clearCookie('token')
    res.json({ message: 'Succesfully Loged Out' })
});

module.exports = router
