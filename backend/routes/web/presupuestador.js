const router = require('express').Router();
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/pages/presupuestador.html'));
});

module.exports = router
