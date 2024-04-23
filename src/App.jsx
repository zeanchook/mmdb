import { useState,useEffect } from 'react'
// import './App.css'
import MainPage from "./MainPage"
import MovieDetails from "./MovieDetails"


import MovieItem from "./MovieItem"
import NavBar from "./NavBar"
import './test.css'
import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function App() {
f
  const [ratingsData, setRatingsData] = useState([]);

  const [search,setSearch] = useState("");
  const [searchString, setsearchString] = useState("");

  const [searchResults,setSearchResults] = useState("");

  // handle search ranking ONLY
  const [searchRanking,setSearchRanking] = useState([])
  const [recentSearch, setRecentSearch] = useState([]);

 const navigate = useNavigate();
  console.log(ratingsData)
  const handleFavourite =(items) =>
  {
    let newData = ratingsData
    let finder = newData.findIndex(x => parseInt(x.fields.MovieID) === items.id)
    console.log(finder)
    let ratingsChanged = {change: "no"}
    let favouriteChanged = {change: "no"}
    let favourite = "no" ;


    if(finder !== -1)
    {
          ratingsData[finder].fields?.Favourite === "no" ? favourite = "yes" : favourite

      favouriteChanged = {change: "yes"}
      console.log(favourite)

      let newData2 = [
        {id: newData[finder].id,
        createdTime: newData[finder].createdTime, 
        fields:{
          MovieName: items.title,
          MovieID: items.id,
          Rating: newData[finder].fields.Rating, ratingsChanged,
          backgroundImage: items.poster, 
          Favourite: favourite, favouriteChanged}},
        ...newData.slice(0, finder),
        ...newData.slice(finder + 1)]
        console.log(newData2)
        setRatingsData(newData2)
    }
    else{
      let newdata3 = [
      {id: "new",
      createdTime: "newtime", fields:{MovieName: items.title,
      MovieID: items.id,Rating: "", ratingsChanged,
      backgroundImage: items.poster_path, Favourite: "no"}},
    ...newData]
    setRatingsData(newdata3)
    }
  }

  const handleRatings = (returnRatings,movDetails) =>
  {
    let newData = ratingsData
    let finder = newData.findIndex(x => parseInt(x.fields.MovieID) === movDetails.id)
    let ratingsChanged = {change: "no"}
    console.log(movDetails.poster_path)
    if(finder !== -1)
    {
      newData[finder].fields.Rating !== returnRatings ? ratingsChanged = {change: "yes"} : 0

    let newData2 = [
      {id: newData[finder].id,
      createdTime: newData[finder].createdTime, 
      fields:{MovieName: movDetails.title,
        MovieID: movDetails.id,Rating: returnRatings, 
        ratingsChanged,backgroundImage: movDetails.poster_path}},
      ...newData.slice(0, finder),
      ...newData.slice(finder + 1)]
      console.log(newData2)
      setRatingsData(newData2)
    }
    else{
      let newdata3 = [
        {id: "new",
      createdTime: "newtime", 
      fields:{MovieName: movDetails.title,
        MovieID: movDetails.id,
        Rating: returnRatings, ratingsChanged,
        backgroundImage: movDetails.poster_path, 
        Favourite: "no"}},
    ...newData]
    setRatingsData(newdata3)
    }
    
  }

  const updateRating = () =>
  {
    async function createRatings(fields) {
      console.log("inside",fields)
    const url = `https://api.airtable.com/v0/app6jeHx0D6EIgyYt/Top%20MMDB%20Ratings/`;
    const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
    const data = {
      fields:
      {
      MovieName: fields?.MovieName,
      MovieID: JSON.stringify(fields?.MovieID),
      Rating: fields?.Rating,
      backgroundImage: fields?.backgroundImage,
      Favourite: fields?.Favourite
      }
    };
    const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),})
    const myRatings = await response.json();
    // console.log("thisone !!!!:",myRatings)

    let finder = ratingsData.findIndex(x => parseInt(x.fields.MovieID) === parseInt(myRatings.fields.MovieID))
    setRatingsData([{...myRatings}, ...ratingsData.slice(0, finder), ...ratingsData.slice(finder + 1)])
  }


  async function updateRatings(x) {
    // console.log("inside",x)
  const url = `https://api.airtable.com/v0/app6jeHx0D6EIgyYt/Top%20MMDB%20Ratings/${x.id}`;
  const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
  const headers = {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  }
  const data = {
    fields:
    {
    Rating: x.fields?.Rating,
    Favourite: x.fields?.Favourite
    }
  };
  const response = await fetch(url, {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify(data),})
  const myRatings = await response.json();
  // console.log("thisone !!!!:",myRatings)
}


  ratingsData.forEach(x => 
    {
      if(x.id === "new")
      {
          createRatings(x.fields);
      }
      else if(x.fields.ratingsChanged?.change === "yes")
      {
            updateRatings(x)
            // console.log(x)
      }
      else if(x.fields.favouriteChanged?.change === "yes")
      {
            updateRatings(x)
            // console.log(x)
      }
    })

}

  // ! get first data airtable for Recent Search
  useEffect(() => {
    async function mmdbRatingstable() {
      const url = "https://api.airtable.com/v0/app6jeHx0D6EIgyYt/Top%20MMDB%20Ratings";
      const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
      const response = await fetch(url,
        {headers: headers});
      const reponseData = await response.json();
      // console.log(reponseData.records)
      setRatingsData(reponseData?.records)
      // setMyRatings(reponseData?.records)
    }
    mmdbRatingstable();
  }, []);

  useEffect(() => {updateRating()}, [ratingsData]);

  const handlePress = (searchQuery) =>
{
  
    setSearchResults(searchQuery);
    console.log(searchQuery)
    
}
  
const handleSearch = () =>
{
    let searchString = search.replace(" ","%20")
    searchString.length !== 0 ? setsearchString(searchString) : 0
        navigate("/");

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

  return (
    <>
    <NavBar handleSearch={handleSearch} setSearch={setSearch} 
        searchString={searchString} handlePress={handlePress}/>

    <Routes>
          <Route path="/" element={<MainPage ratingsData={ratingsData} resultsArr={resultsArr} recentSearch={recentSearch}/>} />
          <Route path="/:id" element={<MovieDetails handleRatings={handleRatings} handleFavourite={handleFavourite}/>} />
    </Routes>
    </>
  )
}

export default App
