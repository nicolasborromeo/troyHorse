const router = require('express').Router();
const { Product, Presupuesto, ProductsPresupuestos } = require('../../db/models')

router.get('/ultimo', async (req, res, next) => {
    let ultimo = await Presupuesto.findAll({
       limit: 1,
       attributes: ['codigo'],
       order: [['codigo', 'DESC']]
    })
    res.status(200).json(...ultimo)
})

router.get('/', async (req, res, next)=> {
    let presupuestos = await Presupuesto.findAll({
        include: {model: Product}
    })
    res.status(200).json(presupuestos)
})

router.post('/', async(req,res,next)=> {
    console.log('BODY FROM .POST PRESUPUESTOS ROUTER', req.body)

        //presupuesto model
    const {vendedor, telVendedor,fecha,fechaVenc, condicion,
        cuit, telCliente, iva} = req.body
        //future cliente model but now is part of presupuesto
    const {cliente, direccion, provincia, loc, cp} =req.body
        //product model through productospresupuesto
    const {codigo, descripcion, cantidad, precioUnit, precioTotal, descuento} = req.body
    res.json(vendedor, telVendedor,fecha,fechaVenc, condicion,cliente, telCliente, iva, cuit, direccion, provincia, loc, cp, codigo, descripcion, cantidad, precioUnit, precioTotal)
})

module.exports = router
