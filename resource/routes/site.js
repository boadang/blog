const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// newsController.index
router.use('/', siteController.index);
router.get('/search', siteController.show);

module.exports = router;
