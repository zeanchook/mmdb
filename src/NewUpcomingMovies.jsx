import { useEffect,useState } from "react";
import { getNewMovDetails } from "./service/fetch-newmoviedetail-service"
import { useContext } from "react";
import { DataContext } from "./App";

export default function NewUpcomingMovies()
{
    const [movies,setMovies] = useState("")
    const contextPassed = useContext(DataContext);

    

    useEffect(() => {
        let ignore = false;
    async function fetchData()
    {
        const results = await getNewMovDetails();
        !ignore ? setMovies(results) : 0
    }    
    fetchData();
    return () => {ignore = true;};
    }, []);

    // console.log(Math.floor(Math.random() * movies?.results?.length))
    const filteredMovies = movies?.results?.slice(0 ,5)

    // console.log(filteredMovies?.slice(0,5))
   
    const topMMDBRatings = filteredMovies?.map((x,idx)=>
        {
            return((x?.poster_path && (x?.popularity > 10)) && <div key={"up"+ idx} className="movie-poster-container" onClick={() => contextPassed[0](x.id)} >
            <img src={`https://image.tmdb.org/t/p/w500${x.poster_path}`} alt={x.original_title} />
            <div className="movie-title">{x.original_title}</div>
            <div className="movie-release-date">📅 {x.release_date}</div>
            {/* <div >{movieRatings}</div> */}
          </div>)     
        })

    return(<div style={{display:"flex"}}>New Upcoming Movies: {topMMDBRatings}</div>)
}