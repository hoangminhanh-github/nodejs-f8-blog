class SiteController {
  // [get] /news
  index(req, res) {
    res.render('home')
  }
  //
  search(req, res) {
    res.render('search')
  }
}

module.exports = new SiteController()
