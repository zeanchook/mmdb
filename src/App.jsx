import { useState,useEffect } from 'react'

import { createContext } from "react";
export const DataContext = createContext();

import "bootstrap/dist/css/bootstrap.css";

// import './App.css'
import MainPage from "./pages/MainPage"
import MovieDetails from "./pages/MovieDetails"

import TopRatedTab from "./pages/TopRatedTab"
import GenreTabMovies from "./pages/GenreTabMovies"
import Recommendation from "./pages/Recommendation"

import SearchResults from "./pages/SearchResults"
import Wishlist from "./pages/Wishlist"
import Favourite from "./pages/Favourite"
import NavBar from "./pages/NavBar"
import './cssStuff.css'
import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { getrecentsearch } from "./service/getrecentsearch-at-service"
import { gettopratings } from "./service/gettopratings-at-service"
import { patchtopratings } from "./service/patchtopratings-at-service"
import { posttopratings } from "./service/posttopratings-at-service"

function App() {

  const [ratingsData, setRatingsData] = useState([]);
  const [searchString, setsearchString] = useState("");
  const [searchResults,setSearchResults] = useState("");
  const [searchRanking,setSearchRanking] = useState([])
  const [recentSearch, setRecentSearch] = useState([]);

 const navigate = useNavigate();
  
  const handleFavourite =(type,items,returnRatings,providerDetails) =>
  {
    let newData = ratingsData
    let finder = newData.findIndex(x => parseInt(x.fields.MovieID) === items.id)
    let favourite,wishlist,rating;

    if (finder !== -1)
    {
      favourite = ratingsData[finder].fields?.Favourite ;
      wishlist = ratingsData[finder].fields?.WishList;
      rating = ratingsData[finder].fields?.Rating;
    }
    

    let favouriteChanged = {change: "no"}
    let wishlistChanged = {change: "no"}
    let ratingsChanged = {change: "no"}
    let provider = providerDetails

  
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
          backgroundImage: items.poster_path, 
          Favourite: favourite, favouriteChanged,Genre: getGenre,
          WishList: wishlist,wishlistChanged,Provider: provider}},
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
      WishList: wishlist,Provider: provider}},
    ...newData]
    setRatingsData(newdata3)
    }
  }

  const updateRating = () =>
  {
    async function createRatings(fields) {
    const myRatings = await posttopratings(fields);
    console.log(myRatings)
    let finder = ratingsData.findIndex(x => parseInt(x.fields.MovieID) === parseInt(myRatings.fields.MovieID))
    setRatingsData([{...myRatings}, ...ratingsData.slice(0, finder), ...ratingsData.slice(finder + 1)])
    }
  
  ratingsData.forEach(items => 
    {
      if(items.id === "new")
      {
          createRatings(items.fields);
      }
      else if(items.fields.ratingsChanged?.change === "yes")
      {
        patchtopratings(items)
      }
      else if(items.fields.favouriteChanged?.change === "yes")
      {
        patchtopratings(items)
      }
      else if(items.fields.wishlistChanged?.change === "yes")
      {
        patchtopratings(items)
      }
    })
}

  useEffect(() => {
    async function fetchratingsData()
    {
      const results = await gettopratings();
      setRatingsData(results?.records)
    }
    async function fetchRecentSearch()
    {
      const results = await getrecentsearch();
      setRecentSearch(results?.records)
    }
    fetchRecentSearch();
    fetchratingsData();
  }, []);

  useEffect(() => {updateRating()}, [ratingsData]);

  const handlePress = (searchQuery) =>
  {
      setSearchResults(searchQuery);  
  }
  
const handleSearch = (searchValue) =>
{
    let searchString = searchValue.replace(" ","%20")
    if(searchString.length !== 0 )
    {
    setsearchString(searchString)
    navigate("/searchresults")


    const updateSearchRanking = (searchString) => {
        const existingMovieIndex = searchRanking.findIndex(item => item.name === searchString);
        let inside = "";

        if (existingMovieIndex !== -1) {
            inside = [...searchRanking]
            inside[existingMovieIndex].count ++;
        }
        else{
            inside = [...searchRanking, { name: searchString, count: 1 }]
        }
        inside !== "" ? setSearchRanking(inside) : 0;
    };


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
        let existIdx = newData2.findIndex(item => item.fields.SearchName === searchString);
        if(existIdx === -1)
        {
        if (index !== -1) {
            for (let i = newData2.length - 1; i > 0; i--) {
                newData2[i].fields.SearchName = newData2[i - 1].fields.SearchName;
            }
            newData2[index].fields.SearchName = searchString;
        }
      }
        setRecentSearch(newData2)
    };
    updateSearchRanking(searchString);
    updateRecentSearch(searchString)
  }
}

  const handleMovDetails = (id) =>
  {
      navigate("/movieresults/"+id);
  }

  return (
    <>
    <DataContext.Provider value={[handleMovDetails,ratingsData]}>
    <NavBar handleSearch={handleSearch} 
        searchString={searchString} handlePress={handlePress} recentSearch={recentSearch}/>

    <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/toprated" element={<TopRatedTab />} />
          <Route path="/genre/:id" element={<GenreTabMovies />} />
          <Route path="/favourite" element={<Favourite ratingsData={ratingsData}/>} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/searchresults" element={<SearchResults searchResults={searchResults}/>} />
          <Route path="/movieresults/:id" element={<MovieDetails handleFavourite={handleFavourite}/>} />
    </Routes>
    </DataContext.Provider>

    </>
  )
}

export default App
