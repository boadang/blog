const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('combined'));

//Template engine setup
app.engine('hbs', exhbs.engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    defaultLayout: 'main',
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/news', (req, res) => {
    res.render('news');
});
app.listen (port, () => console.log(`Server is running on http://localhost:${port}`));