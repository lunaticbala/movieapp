import { useEffect, useState } from "react";
import { useHistory,useParams } from "react-router-dom";
import Button from '@mui/material/Button';

export function EditMovie(){
    const {id} =useParams();
  const [movie, setMovie]=useState(null);
  
  const getMovie=()=>{
    fetch(`https://61c9dfac20ac1c0017ed8ed6.mockapi.io/movies/${id}`,{method:"GET"})
    .then((data)=>data.json())
    .then((mv)=>setMovie(mv));
  }
    
useEffect(getMovie,[])
console.log(movie)
return(
 movie ? <UpdateMovie movie={movie}  /> :""
)
}

 function UpdateMovie({movie}){
    const [name, setName]=useState(movie.name);
    const [poster, setPoster]=useState(movie.poster);
    const [rating, setRating]=useState(movie.rating);
    const [summary, setSummary]=useState(movie.summary);
    const [trailer, setTrailer]=useState(movie.trailer);
    
    const editMovies=()=>{
      const updatedMovie={
        name:name,
        poster:poster,
        rating:rating,
        summary:summary,
        trailer:trailer,
      };
     
    
    
        fetch(`https://61c9dfac20ac1c0017ed8ed6.mockapi.io/movies/${movie.id}`,
        {method:"PUT",
        body: JSON.stringify(updatedMovie),
        headers:{"Content-Type": "application/json",},
        })
        .then((data)=>data.json())
        .then(()=> history.push("/movies"));
        }
    
    
    const history=useHistory();
      return(
        <div className="add-movie-form">
       <input value={name} onChange={(event)=>setName(event.target.value)} placeholder="Enter a name" />
       <input value={poster} onChange={(event)=>setPoster(event.target.value)} placeholder="Enter a url" />
       <input value={rating} onChange={(event)=>setRating(event.target.value)} placeholder="Enter a rating" />
       <input value={summary} onChange={(event)=>setSummary(event.target.value)} placeholder="Enter a summary" />
       <input value={trailer} onChange={(event)=>setTrailer(event.target.value)} placeholder="Enter a trailer" />
      
       
      <Button onClick={editMovies}>Edit Movie</Button>
    
    
    
       </div>
      )
    }
