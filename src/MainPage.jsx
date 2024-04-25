import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { discovergenre } from "./service/genre-service"

import RecentSearch from "./RecentSearch"
import TopMMDBRatings from "./TopMMDBRatings"
import GenreRec from "./GenreRec"; 


export default function Test({ratingsData,resultsArr,recentSearch})
{
    
    // !! Handling genre
    // console.log(ratingsData)

    let getRecGenre = (ratingsData.map(x=>x.fields.Genre)).join(",").split(",")

    getRecGenre = getRecGenre.reduce((acc, x) => {
        // console.log(acc)
        acc[x] = (acc[x] || 0) + 1;
        return acc;
    }, {});

    getRecGenre = Object.entries(getRecGenre).map(([genre, count]) => ({ genre, count }));
    getRecGenre = getRecGenre.sort((b,a) => 
    {
       if(a.count > b.count)
       {
        return 1;
       }
       else if(a.count < b.count)
       {
        return -1;
       }
       else{
        return 0;
       }
    }
    )
  
    console.log("recommned genre:",getRecGenre)

    const genreRecommendation = async() => await discovergenre(getRecGenre);


    // !! Handling genre

    return(
    <>

        <TopMMDBRatings ratingsData={ratingsData}/>
        <GenreRec genreRecommendation={genreRecommendation} getRecGenre={getRecGenre}/>
    
        <div className="app-container">
        <div><RecentSearch recentSearch={recentSearch}/></div>
        
        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
            {resultsArr}    
        </div>
        
    </div>
    
    </>);
}



