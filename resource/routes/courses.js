// ./routes/courses.js
const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');
// Khuyến nghị: Tạo một LessonsController riêng để quản lý các action của Lesson
const lessonsController = require('../app/controllers/LessonsController'); 

// --- ROUTES CỦA KHÓA HỌC (courses) ---

// 1. Các routes CRUD cho quản lý admin (nếu có)
router.get('/create', coursesController.create);     // GET /courses/create (Form tạo khóa học mới)
router.post('/store', coursesController.store);     // POST /courses/store (Lưu khóa học mới)
router.get('/listCourses', coursesController.index); // GET /courses/listCourses (Danh sách khóa học cho admin)
router.get('/:id/edit', coursesController.edit);     // GET /courses/ID/edit (Form sửa khóa học)
router.put('/:id', coursesController.update);       // PUT /courses/ID (Cập nhật khóa học)
router.delete('/:id', coursesController.delete);   // DELETE /courses/ID (Xóa khóa học)

// --- ROUTES CỦA BÀI GIẢNG (lessons) THUỘC VỀ KHÓA HỌC ---
// (Đặt TRƯỚC các route :slug hoặc :id chung chung hơn của Course)

// Route để hiển thị form tạo bài giảng cho một khóa học cụ thể
router.get('/:slug/lessons/create', lessonsController.viewCreateLesson); // GET /courses/:slug/lessons/create

// Route để xử lý việc thêm bài giảng mới vào một khóa học cụ thể
router.post('/:slug/lessons', lessonsController.createLesson); // POST /courses/:slug/lessons (Lưu bài giảng mới)

// Nếu bạn có route để chỉnh sửa/xóa bài giảng cụ thể:
// router.get('/:slug/lessons/:lessonId/edit', lessonsController.edit); // GET /courses/slug/lessons/lessonId/edit
// router.put('/:slug/lessons/:lessonId', lessonsController.update);   // PUT /courses/slug/lessons/lessonId
// router.delete('/:slug/lessons/:lessonId', lessonsController.delete); // DELETE /courses/slug/lessons/lessonId


// --- CÁC ROUTES CÔNG KHAI / CHUNG NHẤT (Luôn đặt CUỐI CÙNG) ---
// Router này nên được đặt ở cuối cùng để nó không "nuốt" các route cụ thể ở trên
router.get('/:slug/buy-courses', coursesController.buyCourse); // Ví dụ: /courses/react-js/buy-courses
router.get('/:slug', coursesController.show);                 // Ví dụ: /courses/react-js (Chi tiết khóa học)

module.exports = router;