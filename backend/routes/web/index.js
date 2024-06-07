const express = require('express')
const router = require('express').Router();
const path = require('path')


//AUTH MIDDLEWARE
const { restoreUser, requireAuth } = require('../../utils/auth')

//ROUTERS
const loginRouter = require('./login')
const homeRouter = require('./home')
const productsRouter = require('./products')



router.get('/', restoreUser, async (req,res)=>{
    console.log('USER', req.user)
    if(!req.user) {
        return res.redirect('/login');
    }
    return res.redirect('/home')
})
// Serve static files from the 'frontend' directory
router.use(express.static(path.join(__dirname, '../../../frontend')));
router.use('/login', loginRouter)
router.use('/home', homeRouter)
router.use('/products', productsRouter)

module.exports = router
