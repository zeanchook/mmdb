import { useContext,useState,useEffect } from "react";
import { DataContext } from "./App";

export default function TopRatedTab()
{
    const contextPassed = useContext(DataContext);
    const ratingsData = contextPassed[1];
    
    const [tabDisplay,setTabDisplay] = useState("")

    let filterRatings = ratingsData?.filter(x => typeof(parseInt(x.fields.Rating)) === "number")
    filterRatings = filterRatings.filter(x => x.fields.Rating !== "-")

    filterRatings = filterRatings.sort((b,a) => 
    {
        const ratingA = parseInt(a.fields.Rating)
        const ratingB = parseInt(b.fields.Rating)
        if(ratingA > ratingB)
        {
         return 1;
        }
        else if(ratingA < ratingB)
        {
         return -1;
        }
        else{
         return 0;
        }
    })

    console.log(filterRatings)

    useEffect(() => {
        const topMMDBRatings = filterRatings.map((x,idx)=>
        {
            return <div key={idx} className="movie-poster-container" onClick={() => contextPassed[0](x.fields.MovieID)}>
            <img src={`https://image.tmdb.org/t/p/w500${x.fields.backgroundImage}`} ></img><a>{x.fields.MovieName}</a><a>⭐️ {x.fields.Rating}</a></div>
        })
        setTabDisplay(topMMDBRatings);

    }, [contextPassed]);

    

    return(<>{tabDisplay}</>)
}