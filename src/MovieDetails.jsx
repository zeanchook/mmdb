import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { DataContext } from "./App";

import { getMovDetails } from "./service/fetch-moviedetail-service"




export default function MovieDetails({handleFavourite})
{
    const { id } = useParams();
    const contextPassed = useContext(DataContext);
    const ratingsData = contextPassed[1];
    const [movieDetails, setMovieDetails] = useState("")
    const [providersList , setProviders] = useState("")

    const [providerAvail, setProviderAvail] = useState("No")

    const [providerSelected,setProviderSelected] = useState("")

    const [ratingsVal, setRatingsVal] = useState(0)

    const [curvalue, setCurValue] = useState("")

    const [trailerDisplay2, setTrailerDisplay] = useState("")

    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("/");
    }
    
    const handleChange = (event) =>
    {
        setRatingsVal(event.target.value)
    }

    const handleFavouriteClick = (event) =>
    {
        let buttonValue = event.target.name
        event.target.style.color = "yellow"
        handleFavourite(buttonValue,movieDetails,ratingsVal,providerAvail)
    }

    useEffect(() => {
        async function getDetails()
        {
            let results = await getMovDetails(id);

            let finder = ratingsData.findIndex(x=> parseInt(x.fields.MovieID) === (results.id))
            finder !== -1 ? (setCurValue([ratingsData[finder].fields.Rating,ratingsData[finder].fields.Favourite,ratingsData[finder].fields.WishList]),
            setRatingsVal([ratingsData[finder].fields.Rating])) : 0
                        
            setMovieDetails(results)
        }
        getDetails();   
    }, [ratingsData]);
        
    // ! provider
        useEffect(() => {
            async function getProvider() {
                const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers?&api_key=36d3acba2fb699efb449a8d506e9430a`;
                const response = await fetch(url)
                const myResults = await response.json();
                Object.keys(myResults.results).length === 0 ? setProviderAvail("No") : setProviderAvail("Yes")
                setProviders(myResults)
                }
        getProvider() 
                }, [id]);

        let providersRegions = []
        for(let x in providersList.results)
        {
            providersRegions.push(x)
        }

        const regionList = providersRegions.map((x,idx) => 
        {
            return (<option value={x} key={"option"+idx}></option>)
        })

        // ! provider
        const selectorBox = () =>
        {
            if (regionList.length !== 0)
            {

            return (<div><label htmlFor="regionlist-choice">Check Provider:</label>
            <input placeholder="Select region" list="regionlist" id="regionlist-choice" name="regionlist-choice" onChange={handleRegChange}/>
            <datalist id="regionlist">
                {regionList}
            </datalist></div>)
            }
            else 
            {
                return <div>No provider at the moment</div>
            }
        }
        
        const handleRegChange = (event) =>
        {
            const regionVal = event.target.value
            if(providersRegions.includes(regionVal))
            {
                setProviderSelected(providersList?.results[regionVal])
            }
            
        }

        const providerBarWatch = providerSelected.flatrate?.map((x,idx) => 
        {
            return (
                <div key={idx}>
                    <img src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}/>
                    <p>{x.provider_name}</p>
                </div>
            )
        })

        const providerBarBuy = providerSelected.buy?.map((x,idx) => 
        {
                return (
                <div key={idx}>
                    <img src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}/>
                    <caption>{x.provider_name}</caption>
                </div>
            )
        })

        
        function trailerDisplay(trailer) { 
            console.log(trailer)
            if (trailer?.success === false)
            {
                return "No trailer available"
            }

            else{
            let videoFinder = trailer?.results?.filter(x => x.type === "Trailer")
            console.log(trailer)
            if (movieDetails.original_language !== "en")
            {
                videoFinder = videoFinder?.filter(x => (x.name.includes("English")))
            }
            const url =`https://www.youtube.com/embed/${videoFinder[0].key}?autoplay=1`;
            return <div className="container">
            <iframe width="854" height="480" src={url} frameBorder="0" allow="no; encrypted-media" allowfullscreen></iframe>
                </div>
           }
        }

        const handleTrailerClick = async() =>
        {

            async function getTrailer() {
                const url = `https://api.themoviedb.org/3/movie/${movieDetails?.imdb_id}/videos?&api_key=36d3acba2fb699efb449a8d506e9430a`;
                const response = await fetch(url)
                const myResults = await response.json();
                console.log(myResults)
                return myResults
                }
                
            let trailer = await getTrailer()
            const getItem = trailerDisplay(trailer)
            setTrailerDisplay(getItem)
        }
    
    const ratings = () =>
    {
        return(<input type="range" max="10" min="0" step="0.1" value={ratingsVal} onChange={handleChange}></input> 
        )
    }

    const genres = movieDetails?.genres?.map((x,idx) => 
        {
            return(<span key={"genre"+idx}> {x.name} </span>)
        })
        
        
      


    return (<>
    {/* {movieDetails} */}
    <div style={{display:"flex"}}>
        <img style={{width:"50%"}}src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.original_title} />

    <div className="movie-details">
        <div className="movie-description">
            <div className="movie-title">{movieDetails.title}</div>
            <div className="movie-title">{genres}</div>
            <div className="movie-release-date">{movieDetails.release_date}</div>
            <div className="movie-release-date">{movieDetails.overview}</div>
            <div className="movie-release-date">Runtime : {movieDetails.runtime}</div>
        </div>

        <div className="movie-buttons" >
            <div><button onClick={handleTrailerClick}>Watch Trailer</button> {trailerDisplay2}</div>
            <div>MMDB Ratings: ⭐️ {curvalue[0]} {ratings()}<button name="rating" onClick={handleFavouriteClick}>Vote</button></div>
            <div><button name="favourite"  onClick={handleFavouriteClick}>Favourite: {curvalue[1]}</button></div>
            
            
            <div>
                {selectorBox()}
                {providerBarWatch && <div style={{display:"flex"}}>Watch at: {providerBarWatch}</div>}
                {providerBarBuy && <div style={{display:"flex"}}>Buy at: {providerBarBuy}</div>}
                <button name="wishlist" onClick={handleFavouriteClick}>Wishlist ?</button>
            </div>
            <button onClick={handleBack}>back</button>
        </div>
    </div>
    </div>
    </>)
}