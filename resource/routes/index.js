const newsRouter = require('./news');
const router = require('./site');
const coursesRouter = require('./courses');
const authRouter = require('./auth');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/', router);
    app.use('/courses', coursesRouter);
    app.use('/auth', authRouter);
}

module.exports = route;
