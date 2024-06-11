const router = require('express').Router();
const { Product, Presupuesto, ProductsPresupuesto } = require('../../db/models')

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
        cuit, telCliente, iva, comentario, total} = req.body
    const presupuestoCode = await Presupuesto.getCodigo() + 1
     //future cliente model but now is part of presupuesto
     const {cliente, direccion, provincia, loc, cp} =req.body

        //CREAR PRESUPUESTO IN DATABASE
        // let nuevoPresupuesto = await Presupuesto.create({
        //     codigo: presupuestoCode,
        //     vendedor: vendedor,
        //     telVendedor: telVendedor,
        //     fecha: fecha,
        //     fechaVenc: fechaVenc,
        //     cliente: cliente,
        //     condicion: condicion,
        //     iva: iva,
        //     comentarios: comentario,
        //     total: total
        // })



        //product model through productospresupuesto
    const {codigo, descripcion, cantidad, precioUnit, precioTotal, descuento} = req.body
        //CREAR PRODUCTOPRESUPUESTO DATA
        // let nuevoDetalle = await ProductsPresupuesto.create({

        // })


    res.json({message: 'GOT DATA IN THE BODT', body: req.body})
})

module.exports = router
