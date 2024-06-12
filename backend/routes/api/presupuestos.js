const router = require('express').Router();
// const sequelize = require('sequelize')
const { Product, Presupuesto, ProductsPresupuesto, sequelize} = require('../../db/models')

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



router.post('/', async (req, res, next) => {
    // console.log('BODY FROM .POST PRESUPUESTOS ROUTER', req.body)

    //GET DATA FROM BODY
    const { vendedor, telVendedor, fecha, fechaVenc, condicion,
        cuit, telCliente, comentario, total } = req.body
        let iva = req.body.iva
        if(iva === 'on') {
            iva = true
        } else iva = false
        console.log('TOTAL', total)

    //future cliente model but now is part of presupuesto
    const { cliente, direccion, provincia, loc, cp } = req.body
    //Codigo de presupuesto
    const codigoPresupuesto = await Presupuesto.getCodigo() + 1

    //CHECK IF THE BUDGET HAS ALREADY BEEN SUBMITED //thorw error to avoid duplicates
    //   if(codigoPresupuesto) {
    //     let err = new Error()
    // }


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
        //this console loge PROBES that this if else statement is passing (when passing a null product and one in the database)
        // console.log(productInDb, '============================')
        // console.log(reqProduct)


        //     //create each ProductsPresupuesto
        // console.log('SO FAR SO GOOD')
        let newProductsPresupuesto = await ProductsPresupuesto.create({
            productId: parseInt(reqProduct['id']),
            presupuestoId: parseInt(presupuestoId),
            codigo: reqProduct['codigo'],
            descripcion: reqProduct['descripcion'],
            cantidad: parseInt(reqProduct['cantidad']),
            precioUnit: parseFloat(reqProduct['p-unitario']),
            descuento: reqProduct['descuento'],
            precioTotal: parseFloat(reqProduct['p-total'])
        })
        // console.log('NUEVO PRODUCT PRESUPUESTO:', newProductsPresupuesto)
    })
    // return res.json(newProductsPresupuesto)


    let nuevoPresupuestoCompleto = await Presupuesto.findAll({
        where: { codigo: codigoPresupuesto },
        include:  {
            model: Product,
            as: 'Products', // Ensure this matches the alias defined in your association
            through: { attributes: [] } // If you want to exclude the junction table attributes
        }
    })


    console.log(nuevoPresupuestoCompleto)

    res.status(200).json({
            message: "Successfully stored in the Database",
            NuevoPresupuesto: nuevoPresupuestoCompleto
    })

})

/*
router.post('/', async (req, res, next) => {
    const { vendedor, telVendedor, fecha, fechaVenc, condicion, cuit, telCliente, iva, comentario, total } = req.body;
    const { cliente, direccion, provincia, loc, cp } = req.body;

    let transaction;
    try {
        // Start a transaction
        transaction = await sequelize.transaction();

        // Get the next codigoPresupuesto
        const lastPresupuesto = await Presupuesto.findOne({
            order: [['codigo', 'DESC']],
            transaction
        });
        const codigoPresupuesto = lastPresupuesto ? lastPresupuesto.codigo + 1 : 1;

        // Create a new presupuesto in the database
        const nuevoPresupuesto = await Presupuesto.create({
            codigo: codigoPresupuesto,
            vendedor: vendedor,
            telVendedor: telVendedor,
            fecha: fecha,
            fechaVenc: fechaVenc,
            cliente: cliente,
            condicion: condicion,
            iva: iva,
            comentarios: comentario,
            total: parseFloat(total)
        }, { transaction });

        const presupuestoId = nuevoPresupuesto.id; // Set the ID as foreign key for products

        // Extract productos array from the request body
        const { productos } = req.body;

        // Iterate over each product in the productos array
        for (const reqProduct of productos) {
            reqProduct['descuento'] = reqProduct['descuento'] === '' ? null : reqProduct['descuento'];

            // Find the product in the database by its codigo
            const productInDb = await Product.findOne({
                where: { codigo: reqProduct.codigo },
                attributes: ['id', 'codigo', 'descripcion'],
                transaction
            });

            let prodAttributes;
            if (productInDb) {
                prodAttributes = productInDb.dataValues;
            }

            // If the product does not exist in the database, set codigo and id to null
            if (!productInDb) {
                reqProduct['codigo'] = null;
                reqProduct['id'] = null;
            } else {
                // Check that the values match
                if (reqProduct.codigo !== prodAttributes.codigo || reqProduct.descripcion !== prodAttributes.descripcion) {
                    let err = new Error('Not Matching');
                    err.status = 500;
                    err.message = "Values of product not matching in the database";
                    err.errors = [{ requestValues: "codigo o descripcion distintas al producto en la base de datos" }];
                    throw err; // Throw an error to be caught by the catch block
                }
                reqProduct['id'] = prodAttributes.id;
                reqProduct['codigo'] = prodAttributes.codigo;
                reqProduct['descripcion'] = prodAttributes.descripcion;
            }

            // Create each ProductsPresupuesto entry
            await ProductsPresupuesto.create({
                productId: parseInt(reqProduct['id']),
                presupuestoId: parseInt(presupuestoId),
                codigo: reqProduct['codigo'],
                descripcion: reqProduct['descripcion'],
                cantidad: parseInt(reqProduct['cantidad']),
                precioUnit: parseFloat(reqProduct['p-unitario']),
                descuento: reqProduct['descuento'],
                precioTotal: parseFloat(reqProduct['p-total'])
            }, { transaction });
        }

        // Commit the transaction if all operations succeed
        await transaction.commit();

        // Fetch the newly created presupuesto with associated products for response
        let nuevoPresupuestoCompleto = await Presupuesto.findOne({
            where: { codigo: codigoPresupuesto },
            include: { model: Product }
        });

        res.status(200).json({
            message: "Successfully stored in the Database",
            NuevoPresupuesto: nuevoPresupuestoCompleto
        });

    } catch (error) {
        // Only rollback if the transaction is still active (not finished)
        if (transaction && !transaction.finished) await transaction.rollback();
        next(error); // Pass the error to the error handler middleware
    }
});

*/

module.exports = router;



// const validatePresupuesto = [
//     body('cliente')
//         .exists()
//         .notEmpty()
//         .withMessage(''),
// ]
