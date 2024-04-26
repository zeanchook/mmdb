import { useContext } from "react";
import { DataContext } from "./App";

export default function Favourite()
{
    const contextPassed = useContext(DataContext);
    const ratingsData = contextPassed[1];

    let filterRatings = ratingsData?.filter(x => (x.fields.Favourite) === "yes")
    console.log(filterRatings)
    // filterRatings = filterRatings.filter(x => x.fields.Rating !== "-")
    console.log(filterRatings)

    const topMMDBRatings = filterRatings.map((x,idx)=>
        {
            return <div key={idx} className="movie-poster-container" onClick={() => contextPassed[0](x.fields.MovieID)}>
            <img src={`https://image.tmdb.org/t/p/w500${x.fields.backgroundImage}`} ></img><a>{x.fields.MovieName}</a><a>⭐️ {x.fields.Rating}</a></div>
        })
        
    return (<>{topMMDBRatings}</>)
}