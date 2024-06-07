const router = require('express').Router();
const { Product } = require('../../db/models')
const { Op } = require('sequelize')
const { restoreUser, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { check, body } = require('express-validator')


router.get('/query', requireAuth, async (req, res, next) => {
    console.log('REQ QUERYYY', req.query)
    let query = {
        where: {},
        order: []
    };

    const { descripcion, orderBy, direction } = req.query
    if (descripcion) {
        query.where.descripcion = {
            [Op.like]: `%${descripcion}%`
        };
    }
    if (orderBy !== 'undefined') {
        query.order.push([orderBy, direction.toUpperCase()])
    }


    let queryProducts = await Product.findAll(query);
    res.status(201).json(queryProducts)
});

router.get('/', requireAuth, async (req, res, next) => {
    let products = await Product.findAll()
    res.json(products)
});

router.post('/', requireAuth, async (req, res, next) => {
    const { codigo, descripcion, medidasValor, medidasType, costo, precio, cambio, company } = req.body
    const newProduct = await Product.create({
        codigo, descripcion, medidasValor, medidasType, costo, precio, cambio, company
    })
    res.status(201).json({
        message: 'Successfully added new product to the database',
        nuevoProducto: newProduct
    })
});

router.delete('/:id', requireAuth, async (req, res, next) => {
    const id = req.params.id
    let product = await Product.findByPk(id)
    let descripcion = product.descripcion
    await Product.destroy({
        where: {
            id: id
        }
    })
    res.status(200).json(`Succesfully deleted product: ${descripcion}`)
});

router.put('/:id', requireAuth, async (req, res, next) => {
    const id = req.params.id
    let product = await Product.findByPk(id)
    if (!product) {
        let err = new Error('Not Found')
        err.status = 404
        err.message = "Product not found"
        return next(err)
    }
    const { codigo, descripcion, medidasValor, medidasType, costo, precio, cambio, company } = req.body
    await Product.update(
        req.body,
        { where: { id: id } },
    );
    const update = await Product.findByPk(id)

    res.status(200).json({
        message: `Succesfully updated ${update.descripcion}`,
        updatedProduct: update
    })
})

module.exports = router
