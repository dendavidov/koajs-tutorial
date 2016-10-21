const koaRouter = require('koa-router');

//Instantiate the router:
const router = koaRouter();

function* renderForm() {
  this.render('file_upload')
}

function* handleForm() {
  this.body = this.request.body
}

function* setACookie() {
  this.cookies.set('foo', 'bar', {
    httpOnly: false,
    expires: new Date(Date.now() + 60000 * 60 * 24)
  })
  this.body = 'Welcome here for the first time!';
}

function* count(next) {
  var n = this.session.views;
  if (n === 1) {
    this.body = 'Welcome here for the first time!';
  } else {
    this.body = "You've visited this page " + n + " times!";
  }
}

router.get('/', setACookie);
router.get('/counter', count);
router.get('/files', renderForm);
router.post('/upload', handleForm);

module.exports = router;