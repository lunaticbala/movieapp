import { useState } from "react";
import {Counter} from "./Counter";
import { useHistory } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
export function Movie({ name, poster, rating, summary, deletebutton ,editbutton, id}) {
  const styles = { color: rating >= 8.5 ? "green" : "crimson", fontsize: "18px" };
  const [show, setShow] = useState(false);
  const history=useHistory();
  // const descript = { display: show ? "block" : "none" };
  return (
    <div className="movie_container">
      <img src={poster} alt={name} className="movie_poster" />

      <div className="movie_specs">
        <h3 className="movie_name">{name}</h3>
        <p style={styles} className="movie_rating">{rating}/10</p>


      </div>
      <IconButton onClick={()=> history.push(`/movies/${id}`)}  color="secondary" aria-label="movie details">
      <LightbulbIcon />
      </IconButton>
      <button className="toggle" onClick={() => setShow(!show)}>Toggle</button>
     {show ? <p  className="movie_summary">{summary}</p>:''}
      <div className="movie-action">
        <div> <Counter /> </div>
        <div> {deletebutton}</div>
        <div> {editbutton}</div>
      </div>
    </div>
  );
}
