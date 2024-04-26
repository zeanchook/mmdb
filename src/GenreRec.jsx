import { useEffect, useState } from "react";

import { useContext } from "react";
import { DataContext } from "./App";

import { discovergenre } from "./service/genrerecommend-service"

import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';



export default function GenreRec({getRecGenre}){

    const [genreData, setGenreData] = useState("")
    const [status , setStatus] = useState("")
    // const ratingsData = contextPassed[1];

    const contextPassed = useContext(DataContext);
    const ratingsData = contextPassed[1];


    useEffect(() => {
        let ignore = false;
        setStatus("loading");
        async function fetchData()
        {
        const results = await discovergenre(getRecGenre);
        if(!ignore)
        {
            setGenreData(results)
            setStatus("done");
        }
        }    
    fetchData();
    return () => {ignore = true;};
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

        const matchingRecords = genreData[2]?.records?.filter(record => {
            const genreId = parseInt(record.fields.id);
            return targetGenreIds.includes(genreId);
        });
        
        let returnRecords = matchingRecords?.map(x => x?.fields?.name);


    return(<>{status === "loading" ? <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner> : 
    recLength && 
    <div style={{display:"flex",width:"50%"}}>
        Because you like {returnRecords} So figured you might like these too !{recDisplay}</div>}
    </>)
}