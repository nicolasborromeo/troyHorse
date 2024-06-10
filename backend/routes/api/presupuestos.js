const router = require('express').Router();
const { Product, Presupuesto, ProductsPresupuestos } = require('../../db/models')

router.get('/', async (req, res, next)=> {
    let presupuestos = await Presupuesto.findAll({
        include: {model: Product}
    })
    res.json(presupuestos)
})

router.post('/', async(req,res,next)=> {
        //presupuesto model
    const {vendedor, telVendedor,fecha,fechaVenc, condicion,
        cuit, telCliente, iva} = req.body
        //future cliente model but now is part of presupuesto
    const {cliente, direccion, provincia, loc, cp} =req.body
        //product model through productospresupuesto
    const {codigo, descripcion, cantidad, precioUnit, precioTotal, descuento} = req.body
    console.log(req.body)
    res.json(vendedor, telVendedor,fecha,fechaVenc, condicion,cliente, telCliente, iva, cuit, direccion, provincia, loc, cp, codigo, descripcion, cantidad, precioUnit, precioTotal)
})

module.exports = router
