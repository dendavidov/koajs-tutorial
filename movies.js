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
  if (currentMovie.length === 1) {
    this.body = currentMovie[0];
  } else {
    this.response.status = 404;
    this.body = {message: "Not Found"};
  }
  yield next;
}

router.get('/:id([0-9]{3,})', sendMovieWithId);

function* addNewMovie(next) {
  if(!this.request.body.name ||
    !this.request.body.year.toString().match(/^[0-9]{4}$/g) ||
    !this.request.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){
    this.response.status = 400;
    this.body = {message: "Bad Request"};
  } else {
    const newId = movies[movies.length - 1].id + 1;
    movies.push({
      id: newId,
      name: this.request.body.name,
      year: this.request.body.year,
      rating: this.request.body.rating
    });
    this.body = {
      message: "New movie created.",
      location: "/movies/" + newId
    };
  }
  yield next;
}

router.post('/', addNewMovie);

function* updateMovie(next) {
  if(!this.request.body.name ||
    !this.request.body.year.toString().match(/^[0-9]{4}$/g) ||
    !this.request.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){
    this.response.status = 400;
    this.body = {message: "Bad Request"};
  } else {
    const movieId = this.params.id;
    const movie = movies.find((movie) => (movie.id === + movieId));
    if (movie) {
      movie.name = this.request.body.name;
      movie.year = this.request.body.year;
      movie.rating = this.request.body.rating;
      this.body = {
        message: "Movie edited."
      };
    } else {
      this.response.status = 404;
      this.body = {message: "Not Found"};
    }
  }
  yield next;
}

router.put('/:id([0-9]{3,})', updateMovie);

function* removeMovie(next) {
  const movieId = this.params.id;
  const movieIndex = movies.findIndex((movie) => (movie.id === + movieId));
  if (movieIndex === -1) {
    this.response.status = 404;
    this.body = {message: "Not Found"};
  } else {
    movies.splice(movieIndex, 1);
    this.body = {message: "Delete successful"};
  }
  yield next;
}

router.delete('/:id([0-9]{3,})', removeMovie);


module.exports = router;