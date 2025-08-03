const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const { multipleMongooseObjects, mongooseObject } = require('../../util/Mongoose');
const renderWithDefaultValue = require('../../util/renderHelper');

class CoursesController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                renderWithDefaultValue(res, 'courses/show', {showHeader: true, showFooter: true, course: mongooseObject(course)});
                res.render('courses/show', { course: mongooseObject(course) });
            })
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        renderWithDefaultValue(res,'courses/create', {
            showHeader: true,
            showFooter: true,
        });
    }

    //[POST] courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        console.log(course);
        course.save();
        
        renderWithDefaultValue(res, 'courses/create', {showHeader: true, showFooter: true , course: mongooseObject(course)});
    }

    index(req, res, next) {
        Course.find({})
            .then(courses => {
                renderWithDefaultValue(res, 'courses/create', {showHeader: true, showFooter: true , course: mongooseObject(course)});
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

    buyCourse(req,res,next) {
        let courseData;

        Course.findOne({slug: req.params.slug})
            .then(course => {
                console.log(course);
                if(!course) return res.status(404).send("No courses !");

                courseData = course;

                return Course.find({slug:{$ne: courseData}}).limit(5);
            })
            .then(listCourse => {
                console.log(listCourse);
                renderWithDefaultValue(res, 'courses/buyCourses', {
                    course: mongooseObject(courseData),
                    listCourse: multipleMongooseObjects(listCourse)
                })
            })
            .catch(next);

        // Promise.all([
        //     Course.findOne({_slug: courseData}),
        //     Course.find({_slug: {$ne: courseData}}).limit(5)
        // ])
        //     .then(([course, listCourse]) => {
        //         if(!course) return res.status(404).send('No courses !');

        //         renderWithDefaultValue(res, 'courses/buyCourses', {
        //             course: mongooseObject(course),
        //             listCourse: multipleMongooseObjects(listCourse)
        //         });
        //     })
        //     .catch(next);
    }
}

module.exports = new CoursesController();
