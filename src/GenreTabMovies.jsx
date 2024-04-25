import { useParams } from "react-router-dom";
import { useEffect,useState } from "react"

import { getMovies } from "./service/genremovies-service"


export default function GenreTabMovies()
{

    const [genreMovie, setGenreMovies] = useState("")
    const [pageState, setPage] = useState(1)
    const { id } = useParams();

    console.log(id)
    useEffect(() => {
        let ignore = false;
        async function fetchData()
        {
            const results = await getMovies(id,pageState)
            !ignore ? (setGenreMovies(results)) : 0
        }    
    fetchData();
    return () => {ignore = true;};
    }, [pageState]);

    const handleClickNext = () =>
    {
        if(pageState < parseInt(genreMovie.total_pages))
        {
        setPage(pageState + 1)
        }
    }

    const handleClickPrev = () =>
    {
        if(pageState > 1)
        {
        setPage(pageState - 1)
        }
    }
    

    const topMMDBRatings = genreMovie?.results?.map((x,idx)=>
        {
            return((x?.poster_path && (x?.popularity > 10)) && <div key={"up" + idx} className="movie-poster-container" onClick={() => contextPassed[0](x.id)} >
            <img src={`https://image.tmdb.org/t/p/w500${x.poster_path}`} alt={x.original_title} />
            <div className="movie-title">{x.original_title}</div>
            <div className="movie-release-date">📅 {x.release_date}</div>
          </div>)     
        })


        return(<><div>New Upcoming Movies: </div><div style={{display:"flex",flexWrap: "wrap"}}>{topMMDBRatings}</div><button onClick={handleClickNext}>Next Page</button>
        <button onClick={handleClickPrev}>Prev Page</button>
        </>)

}