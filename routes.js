const koaRouter = require('koa-router');

//Instantiate the router:
const router = koaRouter();

function* renderForm() {
  this.render('file_upload')
}

function* handleForm() {
  this.body = this.request.body
}

router.get('/files', renderForm);
router.post('/upload', handleForm);

module.exports = router;