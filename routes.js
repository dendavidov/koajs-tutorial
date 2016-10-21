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
}

router.get('/', setACookie);
router.get('/files', renderForm);
router.post('/upload', handleForm);

module.exports = router;