import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';

// eslint-disable-next-line react-refresh/only-export-components, react/display-name
export default function({ handleSearch,searchString,handlePress })
{
    const inappropriateKeywords = ["adult","porn","sex","nude","explicit","xxx","nsfw","erotic","sexual","kinky","sensual","intimate","porno"];
    
    const [searchValue , setSearchValue] = useState("")

    const handleChange = (event) =>
    {
        let inappropriateSearch = false;
        inappropriateKeywords.forEach( x=> {
            event.target.value.toLowerCase().includes(x) ? inappropriateSearch = true : 0
        })
        inappropriateSearch === false ? setSearchValue(event.target.value) : (event.target.value = "")

    }

    // Handle Search
    useEffect(() => {
        async function searchMovies() {
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchString}&include_adult=false=false&api_key=36d3acba2fb699efb449a8d506e9430a`;
        const response = await fetch(url)
        const myResults = await response.json();
    
        handlePress(myResults);
        }
        searchString !== "" ? searchMovies() : null
    }, [searchString]);

    return(
        <div className="d-flex" style={{display:"flex"}}>
        <input type="search" id="search" placeholder="Search..." style={{borderRadius:"10px",fontSize:"10px",backgroundColor:"white"}}onChange={handleChange}/>
        <Button variant="success" onClick={()=>handleSearch(searchValue)} style={{borderRadius:"10px",marginLeft:"5px"}}>Search</Button></div>
    )

}