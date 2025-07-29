// --- 1. Nhập các thư viện cần thiết ---
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session'); // Để quản lý session
const flash = require('connect-flash');     // Để hiển thị thông báo tạm thời

// Import các modules tự định nghĩa
const route = require('./routes'); // Import file định nghĩa routes chính
const db = require('./config/db'); // Import file cấu hình kết nối database
const setupViewHelpers = require('./util/viewHelper'); // Import middleware cho view helpers

// --- 2. Khởi tạo ứng dụng Express ---
const app = express();
const port = 3000;

// --- 3. Kết nối đến Database ---
db.connect();

// --- 4. Cấu hình Middleware ---

// Phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware để phân tích cú pháp body của request
// express.urlencoded: Xử lý dữ liệu từ form HTML (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
// express.json: Xử lý dữ liệu JSON (application/json)
app.use(express.json());

// Ghi đè phương thức HTTP cho các request PUT/DELETE (ví dụ: từ form HTML)
app.use(methodOverride('_method'));

// Cấu hình Session Middleware
// PHẢI ĐẶT TRƯỚC connect-flash và bất kỳ middleware nào sử dụng session
app.use(session({
    secret: 'your_super_secret_key_for_session', // Thay bằng một chuỗi bí mật mạnh và duy nhất
    resave: false, // Không lưu lại session nếu không có thay đổi
    saveUninitialized: false, // Không lưu session rỗng
    cookie: { maxAge: 60 * 60 * 1000 } // Thời gian sống của session cookie (1 giờ)
}));

// Cấu hình Connect-Flash Middleware
// PHẢI ĐẶT SAU session middleware
app.use(flash());

// Cấu hình View Helpers (bao gồm việc truyền flash messages vào res.locals và res.renderWithDefaults)
// PHẢI ĐẶT SAU session và flash middleware, và TRƯỚC các route handlers
setupViewHelpers(app);

// HTTP logger (ví dụ: hiển thị log request trên console)
app.use(morgan('combined'));

// --- 5. Cấu hình Template Engine (Handlebars) ---
app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs', // Phần mở rộng của file template
        layoutsDir: path.join(__dirname, 'src/views/layouts'), // Thư mục chứa các layout chính
        defaultLayout: 'main', // Layout mặc định
        partialsDir: path.join(__dirname, 'src/views/partials'), // Thư mục chứa các partials
        helpers: {
            sum: (a, b) => a + b, // Helper ví dụ: tính tổng
            formatDate: (date) => {
                if (!date) return ''; // Xử lý trường hợp ngày không tồn tại
                return new Date(date).toLocaleDateString('vi-VN'); // Định dạng ngày tháng
            },
            // Thêm các helper khác cần thiết cho template của bạn
        },
    }),
);

// Đặt view engine và thư mục chứa các view templates
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views')); // Sử dụng path.join cho cross-platform compatibility

// --- 6. Định nghĩa và sử dụng Routes ---
// Tất cả các route được định nghĩa trong './routes/index.js'
route(app);

// --- 7. Khởi động Server ---
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`),
);