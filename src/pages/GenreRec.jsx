import { useEffect, useState } from "react";

import { useContext } from "react";
import { DataContext } from "../App";

import { discovergenre } from "../service/genrerecommend-service"

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
    let previousIdx = [];

    let recDisplay = genreData[0]?.results?.map((x,idx) => 
        {
            const resultLength = genreData[0]?.results.length
            let randomIdx = Math.floor(Math.random() * resultLength);

            if(previousIdx.includes(randomIdx))
            {
                console.log(previousIdx.includes(randomIdx) === true)
                console.log("here")
                randomIdx = Math.floor(Math.random() * resultLength);
                previousIdx.push(randomIdx)
            }
            else{
                previousIdx.push(randomIdx)
            }
          

            return (<div key={idx} className="movie-poster-container" onClick={() => contextPassed[0](genreData[0].results[randomIdx].id)}>
            <img src={`https://image.tmdb.org/t/p/w500${genreData[0].results[randomIdx].poster_path}`} ></img>
            <div className="movie-title">{genreData[0].results[randomIdx].original_title}</div>            
            </div>)
        })

        recDisplay = recDisplay?.slice(0,5)
      
        const recLength = genreData[1]?.length
        const targetGenreIds = genreData[1]?.split(',').map(x => parseInt(x));

        const matchingRecords = genreData[2]?.records?.filter(record => {
            const genreId = parseInt(record.fields.id);
            return targetGenreIds.includes(genreId);
        });
        
        let returnRecords = matchingRecords?.map(x => x?.fields?.name);


    return(<div style={{display:"flex", alignContent:"center",justifyContent:"center"}}>{status === "loading" ? <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner> : 
    recLength === 0 ? "No recommended movie at the moment" :
    <div style={{display:"flex",alignContent:"center",justifyContent:"center",flexDirection:"column"}}>
        <div style={{textAlign:"center"}}><h2>Because you like {returnRecords?.join(",")}. So we figured that you might like these too !</h2></div>
        <div style={{display:"flex",alignContent:"center",justifyContent:"center"}}>{recDisplay}</div>
        </div>}
    </div>
    )
}