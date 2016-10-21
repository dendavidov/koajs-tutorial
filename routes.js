const koaRouter = require('koa-router');

//Instantiate the router:
const router = koaRouter();

function* renderForm() {
  this.render('form')
}

function* handleForm() {
  this.body = this.request.body
}

router.get('/', renderForm);
router.post('/', handleForm);

module.exports = router;