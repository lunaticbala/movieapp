import "./App.css"
import { useEffect, useState } from "react";
import { Switch,Route,useHistory,useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { MovieList } from "./MovieList";
import { NotFound } from "./NotFound";
import { Home } from "./Home";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { EditMovie } from "./EditMovie";
import { BasicForm } from "./BasicForm";
import { useFormik } from "formik";
import * as yup from 'yup';

export default function App(){
  const [mode, setMode]=useState("dark")
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });


const [movielist, setMovieList]=useState([])
const history=useHistory();

useEffect(()=>{
  fetch("https://61c9dfac20ac1c0017ed8ed6.mockapi.io/movies",{method:"GET"})
  .then((data)=>data.json())
  .then((mvs)=>setMovieList(mvs));
})
return(
  <ThemeProvider theme={theme}>
    <Paper sx={{minHeight:"100vh"}} elevation={3}>
  <div className="App">


   <AppBar position="static">
     <Toolbar >
     <Button color="inherit" onClick={()=> history.push("/")}>Home</Button>
     <Button color="inherit" onClick={()=> history.push("/movies")}>Movies</Button>
     <Button color="inherit" onClick={()=> history.push("/movie/add")}>AddMovies</Button>
     <Button color="inherit" onClick={()=> history.push("/tic-tac-toe")}>Game</Button> 
     <Button  startIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} color="inherit" onClick={()=> setMode( mode === "light" ? "dark" : "light") }>
       {mode === "light" ? "dark" : "light"}
       Mode</Button> 
     </Toolbar>
   </AppBar>
 
    
    
 
  <Switch>
  <Route exact path="/"><Home /></Route>

  <Route  path="/movies/:id"><MovieDetails   /></Route> 
  <Route  path="/movies"><MovieList  /></Route>
  <Route  path="/movie/add"><AddMovies  /></Route>
  <Route  path="/tic-tac-toe"><Play /></Route>
  <Route  path="/movie/edit/:id"><EditMovie /></Route>
  <Route  path="/basic-form"><BasicForm /></Route>
  <Route  path="**"><NotFound /></Route>
  
  </Switch>

  </div>
  </Paper>
  </ThemeProvider>
);
}

 function GameBox({val,onPlayerClick}){
  
  // const [val, setval]=useState(null);
  const styles={ color: val === "X" ? "green" : "red"};

  return(
    <div style={styles} onClick={()=>onPlayerClick() } className="game-box">{val}</div>
  )
}

function Play() {
  const[board, setBoard]=useState([null,null,null,null,null,null,null,null,null])
  const [isXTurn, setIsXTurn]=useState(true);
  const handleclick =(index) =>{
    if(!winner && !board[index]){
    const boardCopy=[...board];
    boardCopy[index]=isXTurn ? "X" : "O";
    setBoard(boardCopy);
    setIsXTurn(!isXTurn);
    }
  }
  
  const decideWinner= board =>{
    const lines=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[3,4,5],[6,7,8],[2,4,6]];

    for(let i=0;i<lines.length;i++){
      const [a,b,c]=lines[i];
     
      if(board[a]!=null&&board[a]=== board[b] && board[a]===board[c])
      
      {
        console.log("winner is",board[a]);
        return board[a];
      }
    }
    return null;
  }
   const winner=decideWinner(board);
  return( <div className="board"> 

{board.map((val,index)=>( <GameBox  val={val}  onPlayerClick={()=>handleclick(index)} />))}
 
 {winner ? <h2>The Winner is {winner}</h2> : ""}
{winner ? ( <button variant="outlined" onClick={()=>{ setBoard([null,null,null,null,null,null,null,null,null])
setIsXTurn(true)}}> <RotateLeftIcon />Refresh</button>) : ("")}
   </div>
   );
}


function MovieDetails(){
  const {id} =useParams();
  const [movie, setMovie]=useState([]);
  
  const getMovie=()=>{
    fetch(`https://61c9dfac20ac1c0017ed8ed6.mockapi.io/movies/${id}`,{method:"GET"})
    .then((data)=>data.json())
    .then((mv)=>setMovie(mv));
  }
    
useEffect(getMovie,[])

  const history=useHistory();
  return (
    <div>
      <iframe width="100%" height="523" src={movie.trailer} title="Youtube vedio player" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen></iframe>
      <div className="movie_container">
      <div className="movie_specs">
    <h3 className="movie_name">{movie.name}</h3>
    <p className="movie_rating">{movie.rating}</p>
    </div>
    <p className="movie_summary">{movie.summary} </p>
    </div>
    <Button onClick={()=>history.goBack()} variant="contained" startIcon={< ArrowBackIosIcon />}>
    back
  </Button>

  
    </div>
  
  )
}









const movievalidationSchema= yup.object({
  name:yup.string().min(5).required("why not to fill this slot?"),
  poster:yup.string().min(5).required("why not to fill this slot?"),
  rating:yup.number().min(1).max(10).required("why not to fill this slot?"),
  summary:yup.string().min(25).required("why not to fill this slot?"),
  trailer:yup.string().min(5).required("why not to fill this slot?"),


})

function AddMovies(){


const {handleSubmit,handleBlur,handleChange,values,touched,errors} = useFormik(
  {
      initialValues:
      {name: "", poster :"", rating:"",summary:"",trailer:""},
      validationSchema : movievalidationSchema,
    
      onSubmit:(newMovie)=>{
          console.log("onsubmit",newMovie);
         addMovies(newMovie)
      }
  })

const addMovies=(newMovie)=>{
 
 


    fetch(`https://61c9dfac20ac1c0017ed8ed6.mockapi.io/movies`,
    {method:"POST",
    body: JSON.stringify(newMovie),
    headers:{"Content-Type": "application/json",},
    })
    .then((data)=>data.json())
    .then(()=> history.push("/movies"));
    }


const history=useHistory();
  return(
    <form onSubmit={handleSubmit} className="add-movie-form">

   <input id="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Enter a name" />
   {touched.name && errors.name ? errors.name : ""}
   <input id="poster" poster="poster" value={values.poster} onChange={handleChange} onBlur={handleBlur} placeholder="Enter a url" />
   {touched.poster && errors.poster ? errors.poster : ""}
   <input id="rating" rating="rating" value={values.rating} onChange={handleChange} onBlur={handleBlur} placeholder="Enter a rating" />
   {touched.rating && errors.rating ? errors.rating : ""}
   <input id="summary" summary="summary" value={values.summary} onChange={handleChange} onBlur={handleBlur} placeholder="Enter a summary" />
   {touched.summary && errors.summary ? errors.summary : ""}
   <input id="trailer" trailer="trailer" value={values.trailer} onChange={handleChange} onBlur={handleBlur} placeholder="Enter a trailer" />
   {touched.trailer && errors.trailer ? errors.trailer : ""}
  
   
  <Button type="submit">Add Movie</Button>



   </form>
  )
}