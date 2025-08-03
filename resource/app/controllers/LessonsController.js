// controllers/LessonsController.js

const Lesson = require('../models/Lesson');
const Course = require('../models/Course'); // Cần import Course để lấy slug hoặc ID
const renderWithDefaultValue = require('../../util/renderHelper');
const { mongooseObject } = require('../../util/Mongoose');

class LessonsController {
    // [GET] /courses//:slug/lessons/create
    viewCreateLesson = async (req, res, next) => {
         try {
            const courseSlug = req.params.slug; // Lấy slug từ URL
            console.log(`Attempting to load create lesson form for course slug: ${courseSlug}`);

            // Tìm khóa học bằng slug để truyền vào view
            const course = await Course.findOne({ slug: courseSlug });

            if (!course) {
                console.log(`Course with slug '${courseSlug}' not found.`);
                return res.status(404).send('Course not found to add lesson.');
            }

            console.log(`Found course: ${course.name} (Slug: ${course.slug})`);

            // Truyền đối tượng course vào view
            renderWithDefaultValue(res, `courses/lessons/createLesson`, { // Tên view là 'lessons/create'
                showHeader: true,
                showFooter: true,
                course: mongooseObject(course) // CHẮC CHẮN TRUYỀN course Ở ĐÂY
            });
        } catch (e) {
            console.error('Error loading view for create lesson form:', e);
            next(e);
        }
    }

    // [POST] /courses/:slug/lessons
    createLesson = async (req, res, next) => { // Đặt tên là createLesson và dùng async/await
        try {
            // 1. Đảm bảo thứ tự tham số là (req, res, next)
            const courseSlug = req.params.slug; // Lấy slug từ URL để có thể chuyển hướng sau
            const lessonData = req.body;

            console.log('COURSESLUG: ', courseSlug);
            console.log('LESSONDATA: ', lessonData);

            // Optional: Tìm course để lấy _id, mặc dù lessonData.courseId đã được gán nếu bạn làm đúng ở form/route
            // Hoặc bạn có thể gán courseId trực tiếp nếu có từ route param hoặc session
            const course = await Course.findOne({ slug: courseSlug });
            if (!course) {
                return res.status(404).send('Course not found.');
            }
            lessonData.courseId = course._id; // Gán ID của khóa học cho bài giảng

            const newLesson = new Lesson(lessonData);
            const savedLesson = await newLesson.save(); // Chờ Promise hoàn thành

            console.log('New lesson added successfully:', savedLesson);

            // 2. Chuyển hướng hoặc gửi JSON response
            // Khuyến nghị: chuyển hướng về trang chi tiết khóa học sau khi thêm bài giảng
            renderWithDefaultValue(res, `courses/lessons/createLesson`, {
                isHeader: true,
                isFooter: true,
            });
            // Hoặc nếu bạn muốn trả về JSON (ví dụ cho API):
            // res.status(201).json({
            //     message: 'Lesson created successfully!',
            //     lesson: mongooseObject(savedLesson) // Sử dụng mongooseObject nếu cần
            // });

        } catch (error) {
            console.error('Error creating lesson:', error);
            next(error); // Chuyển lỗi tới middleware xử lý lỗi của Express
        }
    }
}

module.exports = new LessonsController();