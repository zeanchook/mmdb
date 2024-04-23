
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function MovieDetails({handleRatings,handleFavourite})
{
    const { id } = useParams();

    // const [searchid, setSearchid] = useState("")
    const [movieDetails, setMovieDetails] = useState("")
    const [providers , setProviders] = useState("")
    const [ratingsVal, setRatingsVal] = useState(0)

    const [trailer, getTrailer] = useState("")

    // console.log("this movie details:",movieDetails)

    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("/");
    }
    
    const handleChange = (event) =>
    {
        setRatingsVal(event.target.value)
    }

    const handleClick = () =>
    {
        handleRatings(ratingsVal,movieDetails)
    }

    const handleFavouriteClick = () =>
    {
        handleFavourite(movieDetails)
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

    useEffect(() => {
        async function getProvider() {
            const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers?&api_key=36d3acba2fb699efb449a8d506e9430a`;
            const response = await fetch(url)
            const myResults = await response.json();
            setProviders(myResults)
            // console.log("no went thru?")
            }
        
    getProvider()
              
            }, [id]);
            console.log(movieDetails.imdb_id)
    let providerBar = providers?.results?.US?.flatrate?.map(x => 
    {
        return (
            <div>
                <img src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}/>
            </div>
        )
    })


    useEffect(() => {
        async function getProvider() {
            const url = `https://api.themoviedb.org/3/movie/${movieDetails?.imdb_id}/videos?&api_key=36d3acba2fb699efb449a8d506e9430a`;
            const response = await fetch(url)
            const myResults = await response.json();
            getTrailer(myResults)
            console.log(myResults)
            // console.log("no went thru?")
            }
        
    getProvider()
              
            }, [id]);


        let videoFinder = trailer?.results?.findIndex(x => x.type === "Trailer")
        console.log(trailer)        
        console.log(trailer.results[videoFinder])
        
        let trailerDisplay = <div className="container">
        <div className="row">
        <div className="col-sm-12">
            <h1 className="text-center display-4 mt-5">
            Solodev Web Design & Content Management Software
            </h1>
            <p className="text-center mt-5">
            <a href="#headerPopup" id="headerVideoLink" target="_blank" className="btn btn-outline-danger popup-modal">See Why Solodev WXP</a>
            </p>
            <div id="headerPopup" className="mfp-hide embed-responsive embed-responsive-21by9">
            <iframe className="embed-responsive-item" width="854" height="480" src={`https://www.youtube.com/embed/${trailer.results[videoFinder].key}?autoplay=1`} frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
        </div>
        </div>
        </div>
    
    
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
    <div>{providerBar}</div>
    <div>MMDB Ratings: ⭐️{ratings()}</div><button onClick={handleClick}>Vote</button>
    <div><button onClick={handleFavouriteClick}>Favourite</button></div>
    <button onClick={handleBack}>back</button>
    </>)
}