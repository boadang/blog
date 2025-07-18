class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    show(req, res) {
        res.render('news/show');
    }
}

module.exports = new NewsController();
