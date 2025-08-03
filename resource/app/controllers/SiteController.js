const Course = require('../models/Course');
const { multipleMongooseObjects, mongooseObject } = require('../../util/Mongoose');
const renderWithDefaultValue = require('../../util/renderHelper');

class SiteController {
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                renderWithDefaultValue(res,'home', {
                    showHeader: true,
                    showFooter: true,
                    courses: multipleMongooseObjects(courses)
                })
            })
            .catch(next);
    }

    search(req, res) {
        res.render('news/show');
    }
}

module.exports = new SiteController();
