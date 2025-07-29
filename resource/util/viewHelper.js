// util/viewHelpers.js

const flash = require('connect-flash'); // Cần import connect-flash ở đây
const renderWithDefaultValue = require('./renderHelper'); // Import hàm từ renderHelper

// Hàm này sẽ là một middleware function
function setupViewHelpers(app) {
    // Cấu hình Connect-Flash Middleware (nếu chưa cấu hình ở app.js)
    // Nếu bạn đã cấu hình session ở app.js, bạn có thể bỏ qua dòng này
    // app.use(flash()); 
    // Tuy nhiên, việc đặt flash() ở đây giúp tập trung các helper liên quan đến view

    // Middleware để gán hàm renderHelper vào res
    app.use((req, res, next) => {
        // Gán hàm renderWithDefaultValue vào res.renderWithDefaults
        // Bằng cách này, nó sẽ có quyền truy cập vào res hiện tại mà không cần truyền res làm đối số
        res.renderWithDefaults = (viewName, data = {}) => {
            renderWithDefaultValue(res, viewName, data);
        };

        // Các biến flash messages cho views (res.locals)
        // Đảm bảo connect-flash đã được cấu hình và chạy TRƯỚC middleware này
        res.locals.success_msg = req.flash('success');
        res.locals.error_msg = req.flash('error'); // Hoặc 'error_msg'
        res.locals.errors = req.flash('errors'); // Đối với express-validator errors

        // ... (Thêm các biến global khác cho views vào res.locals nếu cần)
        // res.locals.currentUser = req.user; // Ví dụ nếu bạn dùng Passport.js

        next(); // Quan trọng: chuyển quyền điều khiển cho middleware/route tiếp theo
    });
}

module.exports = setupViewHelpers;