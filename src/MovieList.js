import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Movie } from "./Movie";
import { useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
export function MovieList() {
  const [movies, setMovieList]=useState([])
  const deleteMovie=(id) => {
    // const deleteindex = index;

    // const remainingmovies = movies.filter((mv, idx) => deleteindex != idx);
    // console.log(movies, remainingmovies);
    // setMovieList(remainingmovies);

    fetch(`https://61c9dfac20ac1c0017ed8ed6.mockapi.io/movies/${id}`,{method:"DELETE"})
    .then((data)=>data.json())
    .then(()=>getMovies());
    
    // .then((mvs)=>setMovieList(mvs));
  }

  const getMovies=()=>{
    fetch("https://61c9dfac20ac1c0017ed8ed6.mockapi.io/movies",{method:"GET"})
    .then((data)=>data.json())
    .then((mvs)=>setMovieList(mvs));
  }
    
useEffect(getMovies,[])
const history=useHistory();
  return (
    <div className="movie_list">

      {movies.map(({ name, poster, rating, summary, trailer,id }, index) => (
        <Movie key={id} 
        deletebutton={<IconButton onClick={()=>deleteMovie(id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>}

editbutton={<IconButton onClick={()=>history.push(`/movie/edit/${id}`) }aria-label="edit movie">
<EditIcon />
</IconButton>}

        id={id}
          name={name} poster={poster} rating={rating} summary={summary} trailer={trailer}/>
      ))}
    </div>
  );
}


