import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import MovieItem from "./MovieItem"
import RecentSearch from "./RecentSearch"
import TopMMDBRatings from "./TopMMDBRatings"

import SearchBar from "./SearchBar"

import './test.css'

// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Test({ratingsData})
{

    const [search,setSearch] = useState("");
    const [searchResults,setSearchResults] = useState("");
    const [searchString, setsearchString] = useState("");

    // handle search ranking ONLY
    const [searchRanking,setSearchRanking] = useState([])

    // Local
    // const [recentSearchdata, setRecentSearchdata] = useState([]);
    // Latest Data
    const [recentSearch, setRecentSearch] = useState([]);
    
// Handle Search
const handlePress = (searchQuery) =>
{
    setSearchResults(searchQuery);
}
  
const handleSearch = () =>
{
    let searchString = search.replace(" ","%20")
    searchString.length !== 0 ? setsearchString(searchString) : 0

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
       
        const newData2 = recentSearch.sort( (a,b) => 
        {
            if(a.fields.Name > b.fields.Name) 
            {
                return 1;
            }
            if(a.fields.Name < b.fields.Name)
            {
                return -1;
            }
            return 0;

        })

        let index = newData2.findIndex(item => item.fields.Name === '1');
        if (index !== -1) {
            
            for (let i = newData2.length - 1; i > 0; i--) {
                newData2[i].fields.SearchName = newData2[i - 1].fields.SearchName;
            }
            newData2[index].fields.SearchName = searchString;
        }
        setRecentSearch(newData2)
    };
    // !handle recent search 
updateSearchRanking(searchString);
updateRecentSearch(searchString)
}

// get first data airtable for Recent Search
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
    //   setRecentSearchdata(reponseData);
      setRecentSearch(reponseData?.records);
    }
    recentSearchTable();
  }, []);

const resultsArr = searchResults?.results?.map((items,index)=>
{
    return (<MovieItem items={items} index={index} key={index} ratingsData={ratingsData}/>);
})

const topMMDBRatings = ratingsData.map(x=>
    {
        // <TopMMDBRatings />
        // x.fields.backgroundImage
        // console.log(x)
        return <div className="movie-poster-container"><img src={`https://image.tmdb.org/t/p/w500${x.fields.backgroundImage}`}></img><a>MMDB: {x.fields.Rating}</a></div>
    })
console.log(topMMDBRatings)

    return(
    <>

    <div class="topnav">
    <Link to="/mmdb"><h1>m</h1></Link> |
    <a><SearchBar handleSearch={handleSearch} setSearch={setSearch} 
            searchString={searchString} handlePress={handlePress}/></a>
    </div>
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