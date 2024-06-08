// setting API routers to hablde API requests. REST API server functionality

const router = require('express').Router();

const productRouter = require('./product')
const presupuestoRouter = require('./presupuestos')
const sessionRouter = require('./session')
const { restoreUser } = require('../../utils/auth.js')

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


router.use(restoreUser)

router.use('/presupuestos', presupuestoRouter)
router.use('/products', productRouter)
router.use('/session', sessionRouter)

module.exports = router
