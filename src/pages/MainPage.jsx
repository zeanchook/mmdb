/* eslint-disable react/prop-types */

import SearchBar from "./SearchBar"
import { randomMovies } from "../service/getrandom-movie"

import { useContext,useEffect,useState } from "react";
import { DataContext } from "../App";

export default function MainPage()
{
    const contextPassed = useContext(DataContext);
    const ratingsData = contextPassed[1];
    const [randomMovie,setRandomMovie] = useState("")

    useEffect(() => {
        async function fetchData()
        {
            const results = await randomMovies();
            const lengthRes = results.results.length;
            const randomIdx = Math.floor(Math.random()*lengthRes-1);
            setRandomMovie(results.results[randomIdx])
        }    
        fetchData();
        
        }, []);

    return(
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{height:"100%",width:"100%",position:"absolute",top:"0px",zIndex:"-1",
    backgroundImage:`url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})`,backgroundSize:"cover",backgroundPosition:"center",
    filter:"blur(3px)"}}> 
        </div>
        <div className="main-poster-container" onClick={() => contextPassed[0](randomMovie.id)} style={{top:"100px",position:"absolute",zIndex:"-1",display:"flex",flexDirection:"row"}}>
            <img src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`} style={{margin:"10px",borderRadius:"20px",borderColor:"black",borderStyle:"solid",borderWidth:"5px"}}></img>
            <div style={{backgroundColor:"white",borderRadius:"10px",opacity:"80%"}}>
            <div style={{fontSize:"30px"}}
            className="movie-title">{randomMovie.original_title}</div>
            <div  style={{fontSize:"13px",width:"400px",backgroundColor:"white",borderRadius:"10px"}}className="movie-title">{randomMovie.overview}</div>                        
            </div>
            </div>

           
    </div>);
}



// https://image.tmdb.org/t/p/original/oe7mWkvYhK4PLRNAVSvonzyUXNy.jpg