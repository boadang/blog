const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
const { body } = require('express-validator');

// Route for displaying the login form
router.get('/login', authController.showLoginForm);
router.get('/register', authController.showRegisterForm);
// Route for handling login submission
router.post(
    '/login',
    [
        body('username')
            .notEmpty().withMessage('Tên người dùng không được để trống.'),
        body('password')
            .notEmpty().withMessage('Mật khẩu không được để trống.')
    ],
    authController.handleLogin);
// Route for handling registration submission
router.post(
    '/register',
    [
        body('username')
            .notEmpty().withMessage('Username is required.')
            .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long.')
            .trim().escape(),
        body('email')
            .isEmail().withMessage('Please enter a valid email address.')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Password is required.')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.')
            .trim().escape(),
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match.');
                }
                return value;
            })
            .trim().escape(),
        body('firstName')
            .notEmpty().withMessage('First name is required.')
            .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long.')
            .trim().escape(),
        body('lastName')
            .notEmpty().withMessage('Last name is required.')
            .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long.')
            .trim().escape(),
        body('phoneNumber')
            .notEmpty().withMessage('Phone number is required')
            .trim(),
    ], 
    authController.handleRegister
);

module.exports = router;