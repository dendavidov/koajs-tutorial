const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

const personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;