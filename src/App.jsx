import { useState, useEffect } from "react";

import { createContext } from "react";
export const DataContext = createContext();

import "bootstrap/dist/css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";

import MainPage from "./pages/MainPage";
import MovieDetails from "./pages/MovieDetails";

import TopRatedTab from "./pages/TopRatedTab";
import GenreTabMovies from "./pages/GenreTabMovies";
import Recommendation from "./pages/Recommendation";

import SearchResults from "./pages/SearchResults";
import Wishlist from "./pages/Wishlist";
import Favourite from "./pages/Favourite";
import NavBar from "./pages/NavBar";
import "./cssStuff.css";
import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { patchtopratings } from "./service/patchtopratings-at-service";
import { posttopratings } from "./service/posttopratings-at-service";
import { gettopratings } from "./service/gettopratings-at-service";

function App() {
  // const [ratingsData2, setRatingsData] = useState([]);
  const [searchString, setsearchString] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [searchRanking, setSearchRanking] = useState([]);

  const navigate = useNavigate();

  const recentSearch = useSelector(state => state?.recentSearch.result?.records)
  const dispatch = useDispatch();

  const ratingsData = useSelector(state => state?.handleData.result?.records)
  console.log(ratingsData)

  const handleFavourite = (type, items, returnRatings, providerDetails) => {

    dispatch({
      type: "UPDATE_DATA",
      payload: {
        type: type,
        items: items,
        returnRatings: returnRatings,
        providerDetails: providerDetails,
      },
    });

};

  useEffect(() => {
    const updateRating = () => {
      async function createRatings(fields) {
        const myRatings = await posttopratings(fields);
        dispatch({type: "CREATE_DATA", myRatings})
        console.log(ratingsData)
      }
  
      ratingsData.forEach((items) => {
        if (items.id === "new") {
          console.log("here?")
          createRatings(items.fields);
        } else if (items.fields.ratingsChanged?.change === "yes") {
          patchtopratings(items);
        } else if (items.fields.favouriteChanged?.change === "yes") {
          patchtopratings(items);
        } else if (items.fields.wishlistChanged?.change === "yes") {
          patchtopratings(items);
        }
      });
    };
    updateRating();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratingsData]);

  const handlePress = (searchQuery) => {
    setSearchResults(searchQuery);
  };

  const handleSearch = (searchValue) => {
    let searchString = searchValue.replace(" ", "%20");
    if (searchString.length !== 0) {
      setsearchString(searchString);
      navigate("/searchresults");

      const updateSearchRanking = (searchString) => {
        const existingMovieIndex = searchRanking.findIndex(
          (item) => item.name === searchString
        );
        let inside = "";

        if (existingMovieIndex !== -1) {
          inside = [...searchRanking];
          inside[existingMovieIndex].count++;
        } else {
          inside = [...searchRanking, { name: searchString, count: 1 }];
        }
        inside !== "" ? setSearchRanking(inside) : 0;
      };

      const updateRecentSearch = (searchString) => {
        dispatch({type: 'UPDATE_POST',searchString})
      };
      updateSearchRanking(searchString);
      updateRecentSearch(searchString);
    }
  };

  const handleMovDetails = (id) => {
    navigate("/movieresults/" + id);
  };

  return (
    <>
      <DataContext.Provider value={[handleMovDetails, ratingsData]}>
        <NavBar
          handleSearch={handleSearch}
          searchString={searchString}
          handlePress={handlePress}
          recentSearch={recentSearch}
        />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/toprated" element={<TopRatedTab />} />
          <Route path="/genre/:id" element={<GenreTabMovies />} />
          <Route
            path="/favourite"
            element={<Favourite ratingsData={ratingsData} />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route
            path="/searchresults"
            element={<SearchResults searchResults={searchResults} />}
          />
          <Route
            path="/movieresults/:id"
            element={<MovieDetails handleFavourite={handleFavourite} />}
          />
        </Routes>
      </DataContext.Provider>
    </>
  );
}

export default (App);
