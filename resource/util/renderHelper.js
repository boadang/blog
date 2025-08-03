// util/renderHelper.js

const { mongooseObject } = require("./Mongoose");

/**
 * Hàm trợ giúp để render view với các giá trị mặc định.
 * @param {Object} res Đối tượng phản hồi (response object) của Express.
 * @param {string} viewName Tên của view (ví dụ: 'auth/login').
 * @param {Object} [additionalData={}] Dữ liệu bổ sung muốn truyền vào view.
 * Có thể bao gồm showHeader và showFooter.
 */
function renderWithDefaultValue(res, viewName, additionalData = {}) {
    const defaultData = {
        user: mongooseObject(res.req.user),
        showHeader: true,
        showFooter: true,
        errors: res.req.flash('errors'),
        success: res.req.flash('success'),
    };

    // Kết hợp dữ liệu mặc định và dữ liệu bổ sung.
    // Các thuộc tính trong additionalData sẽ ghi đè lên defaultData nếu trùng tên.
    const dataToRender = { ...defaultData, ...additionalData };

    res.render(viewName, dataToRender);
}

module.exports = renderWithDefaultValue;