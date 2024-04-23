
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function MovieDetails({handleRatings})
{
    const { id } = useParams();

    // const [searchid, setSearchid] = useState("")
    const [movieDetails, setMovieDetails] = useState("")
    const [ratingsVal, setRatingsVal] = useState(0)

    // console.log("this movie details:",movieDetails)

    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("/mmdb/");
    }
    
    const handleChange = (event) =>
    {
        setRatingsVal(event.target.value)
    }

    const handleClick = () =>
    {
        handleRatings(ratingsVal,movieDetails.id,movieDetails.title,movieDetails.poster_path)
    }

    useEffect(() => {
        async function getMovDetails() {
            const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US?&api_key=36d3acba2fb699efb449a8d506e9430a`;
            const response = await fetch(url)
            const myResults = await response.json();
            setMovieDetails(myResults)
            // console.log("no went thru?")
          }
      
    getMovDetails()
          
        }, [id]);

    // console.log(movieDetails)

    const ratings = () =>
    {
        return(<input type="number" max="10" min="0" step="1" placeholder="Input your rating" value={ratingsVal} onChange={handleChange}></input>)
    }

    return (<>
    {/* {movieDetails} */}
    <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.original_title} />
    <div className="movie-title">{movieDetails.title}</div>
    <div className="movie-release-date">{movieDetails.release_date}</div>
    <div className="movie-release-date">{movieDetails.overview}</div>
    <div className="movie-release-date">Runtime : {movieDetails.runtime}</div>
    <div className="movie-release-date">Release Year : {movieDetails.release_date}</div>
    <div>MMDB Ratings: {ratings()}</div><button onClick={handleClick}>Vote</button>
    <button onClick={handleBack}></button>
    </>)
}