const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

// newsController.index
router.use('/', newsController.index);
router.get('/:slug', newsController.show);

module.exports = router;
