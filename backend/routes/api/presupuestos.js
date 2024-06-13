const router = require('express').Router();
const { Product, Presupuesto, ProductsPresupuesto, sequelize } = require('../../db/models')

//middleware
const checkDuplicate = async(req, res, next) => {
    const {codigoPresupuesto} = req.body
    let presuInDatabase = await Presupuesto.findOne({
        where: {codigo : codigoPresupuesto}
    })

    if(presuInDatabase) {
        let err = new Error('Invoice already exists in database');
        err.status = 500
        err.message = 'Invoice already exists in database'
        return next(err)
    }
    return next();
}


router.get('/ultimo', async (req, res, next) => {
    let ultimo = await Presupuesto.findAll({
        limit: 1,
        attributes: ['codigo'],
        order: [['codigo', 'DESC']]
    })
    res.status(200).json(...ultimo)
})

router.get('/', async (req, res, next) => {
    let presupuestos = await Presupuesto.findAll({
        include: { model: Product }
    })
    res.status(200).json(presupuestos)
})



router.post('/', checkDuplicate, async (req, res, next) => {
    //GET DATA FROM BODY
    const { vendedor, telVendedor, fecha, fechaVenc, condicion,
        cuit, telCliente, comentario, total } = req.body
    let iva = req.body.iva
    iva = (iva === 'on') ? true : false;

    // console.log('FROM POST server side, telVendedor', telVendedor)
    // console.log('FROM POST server side, telVendedor type of number?', typeof telVendedor === 'number')
    //future cliente model but now is part of presupuesto
    const { cliente, direccion, provincia, loc, cp } = req.body
    //Codigo de presupuesto
    const codigoPresupuesto = req.body.codigoPresupuesto



    // CREAR PRESUPUESTO IN DATABASE
    await Presupuesto.create({
        codigo: codigoPresupuesto,
        vendedor: vendedor,
        telVendedor: telVendedor.toString(),
        fecha: fecha,
        fechaVenc: fechaVenc,
        cliente: cliente,
        condicion: condicion,
        iva: iva,
        comentarios: comentario,
        total: total
    })
    const nuevoPresupuesto = await Presupuesto.findOne({
        order: [['id', 'DESC']],
        limit: 1
    })
    const presupuestoId = nuevoPresupuesto.id // set the id foreignkey
    // console.log('NUEVO PRESUPEUSTO ------>',nuevoPresupuesto)



    // GET PRODUCTOS [{},{}] and Iterate
    const { productos } = req.body
    productos.forEach(async reqProduct => {

        reqProduct['descuento'] === '' ? null : reqProduct['descuento']

        const productInDb = await Product.findOne({
            where: { codigo: reqProduct.codigo },
            attributes: ['id', 'codigo', 'descripcion']
        })
        let prodAttributes
        productInDb ? prodAttributes = productInDb.dataValues : undefined;

        //If the reqProduct  doens't exist assing codigo and Id to null
        if (!productInDb) {
            reqProduct['codigo'] = null
            reqProduct['id'] = null

            //otherwise check that the values match
        } else {

            if (!reqProduct.codigo === prodAttributes.codigo ||
                !reqProduct.descripcion === prodAttributes.descripcion) {
                let err = new Error('Not Matching');
                err.status = 500
                err.message = "Values of product not matching in the database"
                err.errors = [{ requestValues: "codigo o descripcion distintas al producto en la base de datos" }]
                return next(err)
            }
            reqProduct['id'] = prodAttributes.id
            reqProduct['codigo'] = prodAttributes.codigo
            reqProduct['descripcion'] = prodAttributes.descripcion
        }
        //this console loge PROVES that this if else statement is passing (when passing a null product and one in the database)
        // console.log(productInDb, '============================')
        // console.log(reqProduct)


        //create each ProductsPresupuesto
        await ProductsPresupuesto.create({
            productId: parseInt(reqProduct['id']),
            presupuestoId: parseInt(presupuestoId),
            codigo: reqProduct['codigo'],
            descripcion: reqProduct['descripcion'],
            cantidad: parseInt(reqProduct['cantidad']),
            precioUnit: parseFloat(reqProduct['p-unitario']),
            descuento: reqProduct['descuento'],
            precioTotal: parseFloat(reqProduct['p-total'])
        })
    })


    // let presupuestoCompleto = await Presupuesto.findAll({
    //     where: { codigo: codigoPresupuesto },
    //     include: {
    //         model: Product,
    //         as: 'Products', // Ensure this matches the alias defined in your association
    //         through: { attributes: [] } // If you want to exclude the junction table attributes
    //     }
    // })


    // console.log(presupuestoCompleto)

    res.status(200).json({
        message: "Successfully stored in the Database",
        // NuevoPresupuesto: presupuestoCompleto
    })

})


module.exports = router;



// const validatePresupuesto = [
//     body('cliente')
//         .exists()
//         .notEmpty()
//         .withMessage(''),
// ]
