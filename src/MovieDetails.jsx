import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function MovieDetails({handleRatings,handleFavourite})
{
    const { id } = useParams();

    // const [searchid, setSearchid] = useState("")
    const [movieDetails, setMovieDetails] = useState("")
    const [providersList , setProviders] = useState("")

    const [providerSelected,setProviderSelected] = useState("")
    const [ratingsVal, setRatingsVal] = useState(0)

    // const [trailer, setTrailer] = useState("")

    const [region, setRegion] = useState("")

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
          }

          
      
    getMovDetails()
          
        }, [id]);

        // ! provider
    useEffect(() => {
        async function getProvider() {
            const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers?&api_key=36d3acba2fb699efb449a8d506e9430a`;
            const response = await fetch(url)
            const myResults = await response.json();
            setProviders(myResults)
            }
        
    getProvider()
              
            }, [id]);

        console.log(movieDetails.imdb_id)
        console.log("providers",providersList.results)
        let providersRegions = []
        for(let x in providersList.results)
        {
            providersRegions.push(x)
        }

        const regionList = providersRegions.map(x => 
        {
            return (<option value={x}></option>)
        })

        // ! provider

        console.log(regionList)
        console.log(providersRegions)

        const handleRegChange = (event) =>
        {
            const regionVal = event.target.value
            console.log(regionVal)
            if(providersRegions.includes(regionVal))
            {
                setProviderSelected(providersList?.results[regionVal])
            }
            
        }

        console.log(providerSelected)
        // console.log(providersList?.results[providerSelected])

        const providerBar = providerSelected.flatrate?.map(x => 
        {
            return (
                <div>
                    <img src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}/>
                </div>
            )
        })

        // console.log(providerBar)


    //     let providerRegion = providers.results

    //     for(let x in providerRegion)
    //     {
    //         setRegion(x,...region)
    //     }

    //     console.log(region)
    

    // console.log(movieDetails?.imdb_id)
    // useEffect(() => {
    //     console.log(movieDetails?.imdb_id)
    //     async function getTrailer() {
    //     const url = `https://api.themoviedb.org/3/movie/${movieDetails?.imdb_id}/videos?&api_key=36d3acba2fb699efb449a8d506e9430a`;
    //     const response = await fetch(url)
    //     const myResults = await response.json();
    //     setTrailer(myResults)
    //     console.log(myResults)
    //     }
        
    // getTrailer()
              
    // }, [movieDetails]);

        // console.log(movieDetails)
        function trailerDisplay(trailer) { 
            
            if (trailer?.success === false)
            {
                return "No trailer available"
            }

            else{

            let videoFinder = trailer?.results?.filter(x => x.type === "Trailer")
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
                // setTrailer(myResults)
                console.log(myResults)
                return myResults
                }
                
            let trailer = await getTrailer()
            const getItem = trailerDisplay(trailer)
            setTrailerDisplay(getItem)
        }
    
    const ratings = () =>
    {
        return(<input type="number" max="10" min="0" step="1" placeholder="Input your rating" value={ratingsVal} onChange={handleChange}></input>)
    }

    return (<>
    {/* {movieDetails} */}
    <img style={{width:"10%"}}src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.original_title} />
    <div className="movie-title">{movieDetails.title}</div>
    <div className="movie-release-date">{movieDetails.release_date}</div>
    <div className="movie-release-date">{movieDetails.overview}</div>
    <div className="movie-release-date">Runtime : {movieDetails.runtime}</div>
    <div className="movie-release-date">Release Year : {movieDetails.release_date}</div>
    <div><button onClick={handleTrailerClick}>Watch Trailer</button> {trailerDisplay2}</div>
    <div>MMDB Ratings: ⭐️{ratings()}</div><button onClick={handleClick}>Vote</button>
    <div><button onClick={handleFavouriteClick}>Favourite</button></div>
    <button onClick={handleBack}>back</button>

        <label htmlFor="regionlist-choice">Check Provider:</label>
        <input placeholder="Select region" list="regionlist" id="regionlist-choice" name="regionlist-choice" onChange={handleRegChange}/>
        <datalist id="regionlist">
            {regionList}
        </datalist>

    <div>{providerBar}</div>

        


    </>)
}