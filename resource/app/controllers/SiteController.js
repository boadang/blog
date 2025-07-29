const Course = require('../models/Course');
const { multipleMongooseObjects, mongooseObject } = require('../../util/Mongoose');

class SiteController {
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multipleMongooseObjects(courses)
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('news/show');
    }
}

module.exports = new SiteController();
