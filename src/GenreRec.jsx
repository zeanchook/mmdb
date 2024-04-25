import { useEffect, useState } from "react";

import { useContext } from "react";
import { DataContext } from "./App";

export default function GenreRec({genreRecommendation,getRecGenre}){

    const [genreData, setGenreData] = useState("")

    const contextPassed = useContext(DataContext);


    useEffect(() => {
        let ignore = false;
    async function fetchData()
    {
        const results = await genreRecommendation();
        if(!ignore)
        {
        setGenreData(results)
        }
    }    
    fetchData();
    return () => {
        ignore = true;
    };
    }, [getRecGenre]);

    let recDisplay = genreData[0]?.results?.map((x,idx) => 
        {

            const resultLength = genreData[0]?.results.length

            let randomIdx = Math.floor(Math.random() * resultLength);

            return (<div key={idx} className="movie-poster-container" onClick={() => contextPassed[0](genreData[0].results[randomIdx].id)}>

            <img src={`https://image.tmdb.org/t/p/w500${genreData[0].results[randomIdx].poster_path}`} ></img></div>)
        })

        recDisplay = recDisplay?.slice(0,5)
      
        const recLength = genreData[1]?.length
        const targetGenreIds = genreData[1]?.split(',').map(x => parseInt(x));

        // console.log(targetGenreIds)
        const matchingRecords = genreData[2]?.records?.filter(record => {
            const genreId = parseInt(record.fields.id);
            return targetGenreIds.includes(genreId);
        });
        
        let returnRecords = matchingRecords?.map(x => x?.fields?.name);

     

    // console.log(recDisplay)
    // console.log(genreData)

    return(recLength && <div style={{display:"flex", width:"50%"}}>Because you like {returnRecords} So figured you might like these too !
    {recDisplay}</div>)
}