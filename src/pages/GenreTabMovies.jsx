import { useParams } from "react-router-dom";
import { useEffect,useState } from "react"


import { genrename } from "../service/genrename-service"
import { getMovies } from "../service/genremovies-service"

import { useContext } from "react";
import { DataContext } from "../App";


export default function GenreTabMovies()
{
    const contextPassed = useContext(DataContext);

    const [genreMovie, setGenreMovies] = useState("")
    const [pageState, setPage] = useState(1) 
    const [genreName, setGenreName] = useState("")
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
    }, [pageState,id]);

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

    // console.log(genrename())

    useEffect(() => {
        let ignore = false;
        async function fetchData()
        {
            const results = await genrename()
            console.log(results)
            !ignore ? (setGenreName(results)) : 0
        }    
    fetchData();
    return () => {ignore = true;};
    }, []);

    let displayTitle = ""
    if(genreName)
    {
        let finderName = genreName?.records?.findIndex(x=> parseInt(x.fields.id) === parseInt(id))
        displayTitle = genreName?.records[finderName]?.fields.name
    }


    const topMMDBRatings = genreMovie?.results?.map((x,idx)=>
        {
            return((x?.poster_path && (x?.popularity > 10)) && <div key={"up" + idx} className="movie-poster-container" onClick={() => contextPassed[0](x.id)} >
            <img src={`https://image.tmdb.org/t/p/w500${x.poster_path}`} alt={x.original_title} />
            <div className="movie-title">{x.original_title}</div>
            <div className="movie-release-date">📅 {x.release_date}</div>
          </div>)     
        })


        return(<div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",alignContent:"center"}}><h1>{displayTitle}</h1><div style={{display:"flex",flexWrap: "wrap"}}>{topMMDBRatings}</div>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
        <button style={{width:"100px"}} onClick={handleClickPrev}>Prev Page</button>
        <button style={{width:"100px"}}onClick={handleClickNext}>Next Page</button>
        </div>
        </div>)

}