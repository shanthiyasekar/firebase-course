import "./App.css";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("0");
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [movieTitleUpdate, setmovieTitleUpdate] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id.toString(),
        }));
        console.log(filteredData);
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
      });
      setMovieList([
        ...movieList,
        {
          title: newMovieTitle,
          releaseDate: newReleaseDate,
          receivedAnOscar: isNewMovieOscar,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => 
  {
    console.log("Deleting movie with ID:", id);
    try {
      if (!id) {
        console.error("Invalid document ID");
        return;
      }
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);

      // Update local state immediately after deleting the movie
      setMovieList(movieList.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: movieTitleUpdate });
    setMovieList((prevMovieList) =>
      prevMovieList.map((movie) =>
        movie.id === id ? { ...movie, title: movieTitleUpdate } : movie
      )
    );
   
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          placeholder="Movie title..."
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>submit</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date:{movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder="new Title..."
              value={movieTitleUpdate}
              onChange={(e) => setmovieTitleUpdate(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
