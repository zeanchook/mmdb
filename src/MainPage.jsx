import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import RecentSearch from "./RecentSearch"
import TopMMDBRatings from "./TopMMDBRatings"


export default function Test({ratingsData,resultsArr,recentSearch})
{

const topMMDBRatings = ratingsData.map(x=>
    {
        return <div className="movie-poster-container"><img src={`https://image.tmdb.org/t/p/w500${x.fields.backgroundImage}`}></img><a>MMDB: {x.fields.Rating}</a></div>
    })

    return(
    <>

    <div style={{display:"flex",width:"50%"}}>MMDB Top Rated:
            {topMMDBRatings}
            </div>
    
        <div className="app-container">
        <div><RecentSearch recentSearch={recentSearch}/></div>
        
        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
            {resultsArr}    
        </div>
        
    </div>
    
    </>);
}



