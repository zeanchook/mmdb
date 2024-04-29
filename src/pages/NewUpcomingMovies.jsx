import { useEffect,useState } from "react";
import { getNewMovDetails } from "../service/fetch-newmoviedetail-service"
import { useContext } from "react";
import { DataContext } from "../App";

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

    const filteredMovies = movies?.results?.slice(0 ,5)

    console.log(filteredMovies)
   
    const topMMDBRatings = filteredMovies?.map((item,idx)=>
        {
            const [year, month, day] = item.release_date.split("-");
            const formattedDate = `${day}-${month}-${year}`;

            return((item?.poster_path && (item?.popularity > 10)) && <div key={"up"+ idx} className="movie-poster-container" onClick={() => contextPassed[0](item.id)} >
            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.original_title} />
            <div className="movie-title">{item.original_title}</div>
            <div className="movie-release-date">📅 {formattedDate}</div>
            {/* <div >{movieRatings}</div> */}
          </div>)     
        })

    return(<div style={{display:"flex",alignContent:"center",justifyContent:"center",flexDirection:"column"}}>
            <div style={{textAlign:"center"}}><h2>New Upcoming Movies:</h2></div>
            <div style={{display:"flex",alignContent:"center",justifyContent:"center"}}>{topMMDBRatings}</div>
        </div>)
}