/* eslint-disable react/prop-types */


import RecentSearch from "./RecentSearch"
import TopMMDBRatings from "./TopMMDBRatings"
import GenreRec from "./GenreRec"; 
import NewUpcomingMovies from "./NewUpcomingMovies"
import { useContext } from "react";
import { DataContext } from "./App";


export default function MainPage({recentSearch,handleSearch})
{
    const contextPassed = useContext(DataContext);
    const ratingsData = contextPassed[1];
    // !! Handling genre

    // eslint-disable-next-line react/prop-types
    let getRecGenre = (ratingsData.map(x=>x.fields.Genre)).join(",").split(",")

    getRecGenre = getRecGenre.reduce((acc, x) => {
        acc[x] = (acc[x] || 0) + 1;
        return acc;
    }, {});
    console.log(getRecGenre)
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
  


    // !! Handling genre

    return(
    <>
        <div className="app-container">
            <div><RecentSearch recentSearch={recentSearch} handleSearch={handleSearch}/></div> 
        </div>
        
        <NewUpcomingMovies />
        <TopMMDBRatings ratingsData={ratingsData}/>
        <GenreRec getRecGenre={getRecGenre} />
    
        
    
    </>);
}



