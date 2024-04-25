import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react-refresh/only-export-components, react/display-name
export default function({ setSearch,handleSearch,searchString,handlePress })
{
    const inappropriateKeywords = ["adult","porn","sex","nude","explicit","xxx","nsfw","erotic","sexual","kinky","sensual","intimate","porno"];
    // const navigate = useNavigate();
    // const navigate = useNavigate();
    // navigate("/");

    const handleChange = (event) =>
    {
        let inappropriateSearch = false;
        inappropriateKeywords.forEach( x=> {
            event.target.value.toLowerCase().includes(x) ? inappropriateSearch = true : 0
        })
        inappropriateSearch === false ? setSearch(event.target.value) : (event.target.value = "")
        
    // navigate("/");
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
        console.log("no run?",searchString)
    }, [searchString]);
    return(
        <div>
        <input type="text" id="search" placeholder="Search for a movie" onChange={handleChange}/>
        <button onClick={handleSearch}>Search</button></div>
    )

}