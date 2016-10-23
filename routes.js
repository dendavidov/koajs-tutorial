const koaRouter = require('koa-router');
const auth = require('koa-basic-auth');
const credentials = {name: "John", pass:"Dow"};

//Instantiate the router:
const router = koaRouter();

function* renderForm() {
  this.render('file_upload')
}

function* handleForm() {
  this.body = this.request.body
}

function* getRoot() {
  this.render('index')
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

router.get('/', getRoot);
router.get('/cookie', setACookie);
router.get('/counter', count);
router.get('/files', renderForm);
router.post('/upload', handleForm);

// Set up authentication here as first middleware. This returns an error if user is not authenticated.
router.get('/protected', auth(credentials), function *(next){
  this.body = 'You have access to the protected area.';
  yield next;
});

// No authentication middleware present here.
router.get('/unprotected', function*(next){
  this.body = "Anyone can access this area";
  yield next;
});

module.exports = router;