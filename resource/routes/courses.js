// ./routes/courses.js (Phiên bản ĐÃ ĐÚNG thứ tự)
const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');

// Các routes cố định / cụ thể nhất
router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/listCourses', coursesController.index);

// Routes với ID cụ thể và hành động riêng (chỉnh sửa form, cập nhật, xóa)
router.get('/:id/edit', coursesController.edit);   // GET /courses/ID/edit
router.put('/:id', coursesController.update);      // PUT /courses/ID
router.delete('/:id', coursesController.delete);   // DELETE /courses/ID

// Route chung nhất (luôn đặt cuối cùng để bắt các slug không phải là routes khác)
router.get('/:slug', coursesController.show);      // GET /courses/SLUG

module.exports = router;