import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([
    {
      title: "",
      genre: "",
      year: "",
    },
  ]);
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    year: "",
  });

  useEffect(() => {
    fetch("/movies")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setMovies(jsonRes));
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const addMovie = (e) => {
    e.preventDefault();
    const newMovie = {
      title: movie.title,
      genre: movie.genre,
      year: movie.year,
    };
    axios.post("/newMovie", newMovie);
  };

  const deleteMovie = (id) => {
    axios.delete("/deleteMovie/" + id);
  };

  return (
    <div className="App">
      <h1>ADD MOVIE</h1>
      <form action="">
        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
          value={movie.title}
        />
        <input
          type="text"
          placeholder="genre"
          name="genre"
          onChange={handleChange}
          value={movie.genre}
        />
        <input
          type="text"
          placeholder="year"
          name="year"
          onChange={handleChange}
          value={movie.year}
        />
        <button onClick={addMovie}>ADD MOVIE</button>
      </form>
      {movies.map((movie) => {
        return (
          <>
            <h1>{movie.title}</h1>
            <p>{movie.genre}</p>
            <p>{movie.year}</p>
            <button onClick={() => deleteMovie(movie._id)}>DELETE</button>
          </>
        );
      })}
    </div>
  );
}

export default App;
