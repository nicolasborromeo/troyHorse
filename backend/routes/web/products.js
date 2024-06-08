const router = require('express').Router();
const path = require('path')

// Serve the login page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/pages/products.html'));
});

module.exports = router
