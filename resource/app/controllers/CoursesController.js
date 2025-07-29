const Course = require('../models/Course');
const { multipleMongooseObjects, mongooseObject } = require('../../util/Mongoose');

class CoursesController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('courses/show', { course: mongooseObject(course) });
            })
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        console.log(course);
        course.save();
        
        res.render('courses/create');
    }

    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('admin/home', {
                    courses: multipleMongooseObjects(courses)
                })
            })
            .catch(next);
    }

    delete(req,res,next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('/courses/listCourses'))
            .catch(next);
    }

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                if(!course) {
                    return res.status(400).send('Course not found');
                }

                res.render('courses/update', {
                    course: mongooseObject(course)
                })}
            )
            .catch(next);
    }

    // [PUT]/courses/update/:id
    update(req, res, next) {
        Course.updateOne({_id:req.params.id}, req.body)
            .then(() => res.redirect('/courses/listCourses'))
            .catch(next);
    }
}

module.exports = new CoursesController();
