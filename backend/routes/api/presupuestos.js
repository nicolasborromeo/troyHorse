const router = require('express').Router();
const { Product, Presupuesto, ProductsPresupuestos } = require('../../db/models')

router.get('/', async (req, res, next)=> {
    let presupuestos = await Presupuesto.findAll({
        include: {model: Product}
    })
    res.json(presupuestos)
})

module.exports = router
