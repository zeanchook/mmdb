import { useEffect, useState } from "react";

import MovieItem from "./MovieItem"
import RecentSearch from "./RecentSearch"

import './test.css'

const inappropriateKeywords = ["adult","porn","sex","nude","explicit","xxx","nsfw","erotic","sexual","kinky","sensual","intimate","porno"];

export default function Test()
{
    const [ratings, setMyRatings] = useState([]);

    const [search,setSearch] = useState("");
    const [searchResults,setSearchResults] = useState("");
    const [searchString, setsearchString] = useState("");

    // handle search ranking ONLY
    const [searchRanking,setSearchRanking] = useState([])

    // Local
    const [recentSearchLocal, setRecentSearchLocal] = useState([]);
    const [recentSearchdata, setRecentSearchdata] = useState([]);
    // Latest Data
    const [recentSearch, setRecentSearch] = useState([]);
    
const handleChange = (event) =>
{
    let inappropriateSearch = false;
    inappropriateKeywords.forEach( x=> {
        event.target.value.toLowerCase().includes(x) ? inappropriateSearch = true : 0
    })
    inappropriateSearch === false ? setSearch(event.target.value) : (event.target.value = "")
}

// Handle Search
useEffect(() => {
    async function searchMovies() {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchString}&include_adult=false=false&api_key=36d3acba2fb699efb449a8d506e9430a`;
      const response = await fetch(url)
      const myResults = await response.json();
      setSearchResults(myResults);
    }
    searchString !== "" ? searchMovies() : null
  }, [searchString]);
  
const handleSearch = () =>
{
    let searchString = search.replace(" ","%20")
    setsearchString(searchString)

    // !handle ranking search 
    const updateSearchRanking = (searchString) => {
        const existingMovieIndex = searchRanking.findIndex(item => item.name === searchString);
        let inside = "";

        if (existingMovieIndex !== -1) {
            inside = [...searchRanking]
            inside[existingMovieIndex].count ++;
            // console.log("inside become",inside)
        }
        else{
            inside = [...searchRanking, { name: searchString, count: 1 }]
        }
        inside !== "" ? setSearchRanking(inside) : 0;
    };
    // !handle ranking search ends

    // !handle recent search 
    const updateRecentSearch = (searchString) => {
        const existingMovieIndex = recentSearchLocal.findIndex(item => item === searchString);
        let inside = "";
        // console.log("existingMovieIndex",existingMovieIndex)
        if (existingMovieIndex === -1) {

            inside = [searchString,...recentSearchLocal];
            console.log("inside become",inside);
        }
        // console.log("inside",inside)

        let newData = recentSearchdata.records.map((item) => ({...item, fields:{...item.fields, SearchName: inside[parseInt(item.fields.Name)-1]}}));
        // console.log("newData:",newData)
        inside !== "" ? (setRecentSearch(newData),setRecentSearchLocal(inside)) : 0
    };
    // !handle recent search 
updateSearchRanking(searchString);
updateRecentSearch(searchString)
}

// get first data airtable
useEffect(() => {
    async function recentSearchTable() {
      const url = "https://api.airtable.com/v0/app6jeHx0D6EIgyYt/RecentSearch";
      const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
      const response = await fetch(url,
        {headers: headers});
      const reponseData = await response.json();
      setRecentSearchdata(reponseData);
      setRecentSearch(reponseData?.records);
    }
    recentSearchTable();
  }, []);

//   console.log("recentSearchdata",recentSearchdata)


// Handle Search ENDS

const resultsArr = searchResults?.results?.map((items,index)=>
{
    return (<MovieItem items={items} index={index} key={index}/>);
})

console.log("recentSearch",recentSearch)
// console.log(recentSearchBar)

console.log("search",search)

    return(
    <>
    <h1>mmdb</h1>
        <div className="app-container">
            <input type="text" id="search" placeholder="Search for a movie" onChange={handleChange}/>
            <button onClick={handleSearch}>Search</button>
            
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
            <RecentSearch recentSearch={recentSearch}/>
            </div>
    {resultsArr}
    
    </>);
}




// airtable fetch
    // useEffect(() => {
    //     async function loadHolidays() {
    //       const url = "https://api.airtable.com/v0/app6jeHx0D6EIgyYt/Top%20MMDB%20Ratings";
    //       const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
    //       const headers = {
    //         'Authorization': `Bearer ${authToken}`,
    //         'Content-Type': 'application/json'
    //       }
    //       const response = await fetch(url,
    //         {headers: headers});
    //       const myRatings = await response.json();
    //       setMyRatings(myRatings);
    //     }
    //     loadHolidays();
    //   }, []);

    // airtable top search fetch
    // useEffect(() => {
    //     async function loadHolidays() {
    //       const url = "https://api.airtable.com/v0/app6jeHx0D6EIgyYt/Top%20Search";
    //       const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
    //       const headers = {
    //         'Authorization': `Bearer ${authToken}`,
    //         'Content-Type': 'application/json'
    //       }
    //       const response = await fetch(url,
    //         {headers: headers});
    //       const myRatings = await response.json();
    //       setMyRatings(myRatings);
    //     }
    //     loadHolidays();
    //   }, []);

    // console.log("myratings:",myRatings)


    // useEffect(() => {
    //     async function loadHolidays() {
    //       const url = "https://api.airtable.com/v0/app6jeHx0D6EIgyYt/Top%20Search";
    //       const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
    //       const headers = {
    //         'Authorization': `Bearer ${authToken}`,
    //         'Content-Type': 'application/json'
    //       }
    //       const response = await fetch(url,
    //         {headers: headers});
    //       const myRatings = await response.json();
    //       setMyRatings(myRatings);
    //     }
    //     loadHolidays();
    //   }, []);