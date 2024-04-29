import { useNavigate } from "react-router-dom";
import MovieItem from "./MovieItem"
import { useContext } from "react";
import { DataContext } from "../App";


export default function SearchResults({searchResults})
{
    const contextPassed = useContext(DataContext);
    const ratingsData = contextPassed[1];

    const resultsArr = searchResults?.results?.map((items,index)=>
    {
        return (<MovieItem items={items} index={index} key={index} ratingsData={ratingsData}/>);
    })

    
    return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
       
    <h2>Search Results</h2><div style={{display:"flex",flexWrap:"wrap",margin:"30px"}}>{resultsArr}</div>
</div>)
}