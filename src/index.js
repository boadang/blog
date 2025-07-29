const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

//HTTP logger
app.use(morgan('combined'));

// Template engine setup
app.engine('hbs', exhbs.engine({
    extname: '.hbs',
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));