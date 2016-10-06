const koa = require('koa');
const app = koa();

app.use(function* (next){
  console.log('1');

  yield next;

  console.log('2');
});

app.use(function* (next){
  console.log('3');

  yield next;

  console.log('4');
});

app.use(function* (next){
  console.log('5');

  this.body = "Hello generators!";

  console.log('6');
});

app.listen(3000, () => {
  console.log('Server running on https://localhost:3000');
});