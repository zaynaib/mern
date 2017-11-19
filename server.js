const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient: true
  }
);

const db = require('./models');
//console.log(db.Article);

const {Article} = db

// Article.create({
// 	title: "insert",
// 	url: "http://www.ola.com"
// }).then(x => console.log(x))
// .catch(x => console.log(x))

app.post("/api/saved", (req,res) => {
  var article = req.body
  console.log(article)

 Article.create(article)
  .then(() => {
    res.json(article)
  })
  .catch((err) => {
    res.json(err)
  })
})


// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
