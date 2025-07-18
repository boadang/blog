const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');
const route = require('./routes');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
route(app);

//HTTP logger
app.use(morgan('combined'));

//Template engine setup
app.engine(
    'hbs',
    exhbs.engine({
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'src/views/layouts'),
        defaultLayout: 'main',
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`),
);
