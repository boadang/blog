class SiteController {
    index(req, res) {
        res.render('news');
    }

    search(req, res) {
        res.render('news/show');
    }
}

module.exports = new SiteController();
