const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: { type: String, default: Date.now },
});

//Export the model
module.exports = mongoose.model('Url', urlSchema);
