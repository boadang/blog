const user = require('../models/User');
const { multipleMongooseObjects, mongooseObject } = require('../../util/Mongoose');
const renderWithDefaultValue = require('../../util/renderHelper');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

class AuthController {
    showLoginForm(req,res,next) {
        // Sử dụng renderWithDefaultValue thay vì res.render()
        renderWithDefaultValue(res, 'auth/login', {
            user: mongooseObject(req.user),
            showHeader: false,
            showFooter: false, 
            errors: req.flash('errors'),
        });
    }

    showRegisterForm(req,res,next) {
        // Sử dụng renderWithDefaultValue thay vì res.render()
        renderWithDefaultValue(res, 'auth/register', {
            user: mongooseObject(req.user),
            showHeader: false,
            showFooter: false, 
            errors: req.flash('errors'),
        });
    }

    async handleLogin(req,res,next) {
        const errors = validationResult(req);
        // If there are errors, redirect to the login form with errors
        if(!errors.isEmpty()){
            req.flash('errors', errors.array());
            return res.redirect('/auth/login');
        }

        const {username, password} = req.body;

        try{
            const existingUser = await user.findOne({username});

            if (!existingUser) {
                req.flash('errors', [{msg: 'Invalid username or password.'}]);
                return res.redirect('/auth/login');
            }

            //Compare the password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if(!isMatch){
                req.flash('errors', [{msg: 'Invalid username or password.'}]);
                return res.redirect('/auth/login');
            }

            // If the password matches, set the user in the session
            req.session.user = mongooseObject(existingUser);
            req.flash('success', 'Login successful!');
            return res.redirect('/');
        }catch(e){
            console.error('Error during login:', e);
            req.flash('errors', [{msg: 'An error occurred during login. Please try again.'}]);
            return res.redirect('/auth/login');
        }
    }

    async handleRegister(req,res,next) {
        //Take the validation errors
        const errors = validationResult(req);

        //If there are errors, redirect to the register form with errors
        if(!errors.isEmpty()) {
            req.flash('errors', errors.array());
            return res.redirect('/auth/register');
        }

        const {username, email, password, lastName, firstName, phoneNumber} = req.body;
        console.log(req.body);

        try{
            //Check if the user already exists
            const existingUser = await user.findOne({ $or: [{username}, {email}] });

            if(existingUser) {
                req.flash('errors', [{msg: 'Username or email already exists.'}]);
                return res.redirect('/auth/register');
            }

            const newUser = new user({
                username,
                email,
                password: bcrypt.hashSync(password, 10), // Hash the password   
                lastName,
                firstName,
                phoneNumber
            });

            await newUser.save();
            console.log('Người dùng mới đã đăng ký:', newUser);

            // Redirect to the login page after successful registration
            req.flash('success', 'Registration successful! Please log in.');
            res.redirect('/auth/login');
        }catch(e){
            console.error('Lỗi khi đăng ký người dùng:', e);
            req.flash('errors', [{msg: 'An error occurred during registration. Please try again.'}]);
            res.redirect('/auth/register');
        }
    }
}

module.exports = new AuthController();