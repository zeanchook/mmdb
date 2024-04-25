import { useState,useEffect } from 'react'

import { createContext } from "react";
export const DataContext = createContext();

// import './App.css'
import MainPage from "./MainPage"
import MovieDetails from "./MovieDetails"

import TopRatedTab from "./TopRatedTab"
import GenreTab from "./GenreTab"
import GenreTabMovies from "./GenreTabMovies"


import Wishlist from "./Wishlist"
import Favourite from "./Favourite"
import MovieItem from "./MovieItem"
import NavBar from "./NavBar"
import './test.css'
import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function App() {

  const [ratingsData, setRatingsData] = useState([]);

  const [search,setSearch] = useState("");
  const [searchString, setsearchString] = useState("");

  const [searchResults,setSearchResults] = useState("");

  // handle search ranking ONLY
  const [searchRanking,setSearchRanking] = useState([])
  const [recentSearch, setRecentSearch] = useState([]);

 const navigate = useNavigate();
  // console.log(ratingsData)
  

  // ! one
  const handleFavourite =(type,items,returnRatings) =>
  {
    console.log(type)
    let newData = ratingsData
    
    let finder = newData.findIndex(x => parseInt(x.fields.MovieID) === items.id)

    let favourite,wishlist,rating;

    if (finder !== -1)
    {
      favourite = ratingsData[finder].fields?.Favourite ;
      wishlist = ratingsData[finder].fields?.WishList;
      rating = ratingsData[finder].fields?.Rating;
    }
    

    

    console.log(finder)

    let favouriteChanged = {change: "no"}
    let wishlistChanged = {change: "no"}
    let ratingsChanged = {change: "no"}

  
    switch (type)
    {
      case 'favourite':
        finder !== -1 ? (newData[finder].fields?.Favourite === "no" ? favourite = "yes" : favourite = "no",favouriteChanged = {change: "yes"}) 
        : (favourite = "yes",rating = "-",wishlist =  "no")
        break;
      case 'wishlist':
        finder !== -1 ? (newData[finder].fields?.WishList === "no" ? wishlist = "yes" : wishlist = "no", wishlistChanged = {change: "yes"}) 
        : (wishlist =  "yes",rating = "-",favourite = "no")
        break;
      case 'rating':
        finder !== -1 ? (newData[finder].fields.Rating !== returnRatings ? (ratingsChanged = {change: "yes"}, rating = returnRatings) : rating) 
        : (rating = returnRatings ,wishlist =  "no",favourite = "no")
        break;
    }

    const getGenre = items.genres.map(items => items.id).join(",")
      
    if(finder !== -1)
    {
      let newData2 = [
        {id: newData[finder].id,
        createdTime: newData[finder].createdTime, 
        fields:{
          MovieName: items.title,
          MovieID: items.id,
          Rating: rating, ratingsChanged,
          backgroundImage: items.poster, 
          Favourite: favourite, favouriteChanged,Genre: getGenre,
          WishList: wishlist,wishlistChanged}},
        ...newData.slice(0, finder),
        ...newData.slice(finder + 1)]
        console.log(newData2)
        setRatingsData(newData2)
    }
    else{
      let newdata3 = [
      {id: "new",
      createdTime: "newtime", fields:{MovieName: items.title,
      MovieID: items.id,
      Rating: rating, ratingsChanged,
      backgroundImage: items.poster_path, Favourite: favourite,Genre: getGenre,
      WishList: wishlist}},
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
      Favourite: fields?.Favourite,
      Genre: fields?.Genre,
      WishList: fields?.WishList
      }
    };
    const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),})
    const myRatings = await response.json();
    console.log("thisone !!!!:",myRatings)

    let finder = ratingsData.findIndex(x => parseInt(x.fields.MovieID) === parseInt(myRatings.fields.MovieID))
    setRatingsData([{...myRatings}, ...ratingsData.slice(0, finder), ...ratingsData.slice(finder + 1)])
  }


    async function updateRatings(x) {
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
      Favourite: x.fields?.Favourite,
      WishList: x.fields?.WishList
      }
    };
    const response = await fetch(url, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(data),})
    const myRatings = await response.json();
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
      else if(x.fields.wishlistChanged?.change === "yes")
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
      setRatingsData(reponseData?.records)
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

  const handleMovDetails = (id) =>
    {
        navigate("/"+id);
    }

const resultsArr = searchResults?.results?.map((items,index)=>
{
    return (<MovieItem items={items} index={index} key={index} ratingsData={ratingsData}/>);
})

  return (
    <>
    <DataContext.Provider value={[handleMovDetails,ratingsData]}>
    <NavBar handleSearch={handleSearch} setSearch={setSearch} 
        searchString={searchString} handlePress={handlePress}/>

    <Routes>
          <Route path="/" element={<MainPage resultsArr={resultsArr} recentSearch={recentSearch}/>} />
          <Route path="/toprated" element={<TopRatedTab />} />
          <Route path="/genre" element={<GenreTab />} />
          <Route path="/genre/:id" element={<GenreTabMovies />} />
          <Route path="/favourite" element={<Favourite ratingsData={ratingsData}/>} />
          <Route path="/wishlist" element={<Wishlist ratingsData={ratingsData}/>} />
          <Route path="/:id" element={<MovieDetails handleFavourite={handleFavourite}/>} />
    </Routes>
    </DataContext.Provider>

    </>
  )
}

export default App
