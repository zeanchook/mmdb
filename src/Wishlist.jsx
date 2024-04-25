import { useContext } from "react";
import { DataContext } from "./App";

export default function Wishlist({ratingsData})
{
    const contextPassed = useContext(DataContext);

    console.log(ratingsData)

    let filterRatings = ratingsData?.filter(x => (x.fields.WishList) === "yes")
    console.log(filterRatings)

    const topMMDBRatings = filterRatings.map((x,idx)=>
        {
            return <div key={idx} className="movie-poster-container" onClick={() => contextPassed[0](x.fields.MovieID)}>
            <img src={`https://image.tmdb.org/t/p/w500${x.fields.backgroundImage}`} ></img><a>{x.fields.MovieName}</a><a>⭐️ {x.fields.Rating}</a></div>
        })
        
    return (<>{topMMDBRatings}</>)
}