const Router = require('koa-router');
const router = Router({
  prefix: '/movies'
});

const movies = [
  {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
  {id: 102, name: "Inception", year: 2010, rating: 8.7},
  {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
  {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
];


function* sendMovies(next){
  this.body = movies;
  yield next;
}

router.get('/', sendMovies);

function* sendMovieWithId(next) {
  const currentMovie = movies.filter(
    (movie) => (movie.id === +this.params.id)
  );
  console.log(currentMovie, this.params);
  if (currentMovie.length === 1) {
    this.body = currentMovie[0];
  } else {
    this.response.status = 404;
    this.body = {message: "Not Found"};
  }
  yield next;
}

router.get('/:id([0-9]{3,})', sendMovieWithId);

module.exports = router;