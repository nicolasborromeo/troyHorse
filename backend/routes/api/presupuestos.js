const router = require('express').Router();
const { Product, Presupuesto, ProductsPresupuesto, sequelize } = require('../../db/models')
const { check, body } = require('express-validator')
const { handleValidationError, handleValidationErrors } = require('../../utils/validation')

//middleware
const checkDuplicate = async (req, res, next) => {
    const { codigoPresupuesto } = req.body
    let presuInDatabase = await Presupuesto.findOne({
        where: { codigo: codigoPresupuesto }
    })

    if (presuInDatabase) {
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
        include: { model: Product },
        order: [['id', 'DESC']]
    })
    res.status(200).json(presupuestos)
})

const validateBody = [
    check('cantidad')
        .exists()
        .notEmpty().withMessage('Por favor ingrese una cantidad')
        .isNumeric()
        .custom = (val) => {
            if (val <= 0) {
                let err = new Error('Cantidad tiene que ser mayor que 0')
            }
            return true
        },
    handleValidationErrors
]

router.post('/', checkDuplicate, async (req, res, next) => {
    //GET DATA FROM BODY
    const { vendedor, telVendedor, fecha, fechaVenc, condicion,
        cuit, telCliente, comentario, total } = req.body
    let iva = req.body.iva
    iva = (iva === 'on') ? true : false;

    const { cliente, direccion, provincia, loc, cp } = req.body
    const codigoPresupuesto = req.body.codigoPresupuesto


    // CREAR PRESUPUESTO IN DATABASE
    await Presupuesto.create({
        codigo: codigoPresupuesto,
        vendedor: vendedor,
        telVendedor: telVendedor,
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



        let productInDb = await Product.findOne({
            where: { codigo: reqProduct.codigo },
            attributes: ['id', 'codigo', 'descripcion']
        })
        let prodAttributes
        productInDb ? prodAttributes = productInDb.dataValues : undefined;

        //If the reqProduct  doens't exist assing codigo and Id to null
        // if (!productInDb) {
        //     reqProduct['codigo'] = null
        //     reqProduct['id'] = null
        //     //otherwise check that the values match
        // } else {
            // if (productInDb && !reqProduct.codigo === prodAttributes.codigo ||
            //     !reqProduct.descripcion === prodAttributes.descripcion) {
            //     let err = new Error('Not Matching');
            //     err.status = 500
            //     err.message = "Values of product not matching in the database"
            //     err.errors = [{ requestValues: "codigo o descripcion distintas al producto en la base de datos" }]
            //     return next(err)
            // } else {
            //     reqProduct['id'] = prodAttributes.id
            //     reqProduct['codigo'] = prodAttributes.codigo
            //     reqProduct['descripcion'] = prodAttributes.descripcion
            // }

        // }
        let parsedDescuento = reqProduct['descuento'] === '' ? 0 : parseInt(reqProduct['descuento']);
        let parsedCantidad = reqProduct['cantidad'] ? Number(reqProduct['cantidad']) : 1
        let parsedTotal = reqProduct['p-total'] ? parseFloat(reqProduct['p-total']) : 0
        let parsedPrecio = reqProduct['p-unitario'] ? parseFloat(reqProduct['p-unitario']) : 0
        let parsedCodigo = reqProduct['codigo'] ? String(reqProduct['codigo']) : null
        let parsedProdId = productInDb ? Number(productInDb.dataValues.id) :  null
        //this console loge PROVES that this if else statement is passing (when passing a null product and one in the database)
        // console.log(productInDb, '============================')
        // console.log(req.Product)
        // let productId =
        let productPack = {
            productId: parsedProdId,
            presupuestoId: presupuestoId,
            codigo: parsedCodigo,
            descripcion: reqProduct['descripcion'],
            cantidad: parsedCantidad,
            precioUnit: parsedPrecio,
            descuento: parsedDescuento,
            precioTotal: parsedTotal
        }
        console.log(productPack)
        try {
            await ProductsPresupuesto.create(productPack)

        } catch (error) {
            console.error(error.status, error.message)
            next(error)
            // res.status(error.status).json(error.message)
        }
        //create each ProductsPresupuesto

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

    res.json({
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
