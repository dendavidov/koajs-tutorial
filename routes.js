const koaRouter = require('koa-router');

//Instantiate the router:
const router = koaRouter();

//Define routes:
router.get('/hello', getMessage);
router.post('/hello', postMessage);
router.all('/test', allMessages);
router.get('/test-id/:id', sendId);
router.get('/test-id/:id/:id2', sendTwoIds);
router.get('/test-5digits-id/:id([0-9]{5})', sendFiveDigitsId);

router.get('/notfound', printErrorMessage);

function* getMessage() {
  this.body = 'hello';
}

function* postMessage() {
  this.body = "You just called the post method at '/hello'!\n";
}

function* allMessages() {
  this.body = "All HTTP calls regardless of the verb will get this response\n";
}

function* sendId() {
  this.body = `The id you specified is ${this.params.id}`;
}

function* sendTwoIds() {
  this.body = `The first id you specified is "${this.params.id}" and the second is "${this.params.id2}".`;
}

function* sendFiveDigitsId() {
  this.body = `id = ${this.params.id}`;
}

function* printErrorMessage() {
  this.body = "Sorry we do not have this resource.";
}

module.exports = router;