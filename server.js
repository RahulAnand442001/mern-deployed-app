const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// db connecction
mongoose
  .connect(
    "mongodb+srv://admin-rahulanand:rahulanand21@cluster0.yyyfe.mongodb.net/moviesDB",
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Database connected successfully !"))
  .catch((error) => console.log(error));

// schema
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  year: String,
});
const Movie = new mongoose.model("Movie", movieSchema);

// routes
app.get("/", (req, res) => {
  res.send("Express running");
});

app.get("/movies", (req, res) => {
  Movie.find()
    .then((movies) => res.json(movies))
    .catch((error) => res.status(400).json({ error: "No movies found" }));
});

app.post("/newMovie", (req, res) => {
  const { title, genre, year } = req.body;
  const new_movie = new Movie({ title, genre, year });
  new_movie.save((err, movie) => {
    if (err) return console.log(err);
    res.json(movie);
  });
});

app.delete("/deleteMovie/:id", (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndDelete({ _id: id }, (err, deletedMovie) => {
    if (err) return error;
    return res.json(deletedMovie);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// port
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
