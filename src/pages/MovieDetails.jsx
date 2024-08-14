import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useContext } from "react";
import { DataContext } from "../App";

import { getMovDetails } from "../service/fetch-moviedetail-service";

import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function MovieDetails({ handleFavourite }) {
  const { id } = useParams();
  const contextPassed = useContext(DataContext);
  const ratingsData = contextPassed[1];
  const [movieDetails, setMovieDetails] = useState("");
  const [providersList, setProviders] = useState("");
  const [providerAvail, setProviderAvail] = useState("No");
  const [providerSelected, setProviderSelected] = useState("");
  const [ratingsVal, setRatingsVal] = useState(0);
  const [curvalue, setCurValue] = useState("");
  const [trailerDisplayStatus, setTrailerDisplay] = useState(true);
  const [trailerID, setTrailerID] = useState("");
  const [isOpenTrailer, setOpenTrailer] = useState(false);
  const [rateDisplay, setRateDisplay] = useState("none");

  const handleRateClick = (event) => {
    rateDisplay === "none" ? setRateDisplay("") : setRateDisplay("none");
    handleFavourite(event.target.name, movieDetails, ratingsVal, providerAvail);
  };

  const handleChange = (event) => {
    setRatingsVal(event.target.value);
    // handleFavourite(event.target.name,movieDetails,event.target.value,providerAvail)
    // setRateDisplay("none")
  };

  const handleFavouriteClick = (event) => {
    let buttonValue = event.target.name;
    handleFavourite(buttonValue, movieDetails, ratingsVal, providerAvail);
  };

  useEffect(() => {
    async function getDetails() {
      let results = await getMovDetails(id);

      let finder = ratingsData.findIndex(
        (x) => parseInt(x.fields.MovieID) === results.id
      );
      finder !== -1
        ? (setCurValue([
            ratingsData[finder].fields.Rating,
            ratingsData[finder].fields.Favourite,
            ratingsData[finder].fields.WishList,
          ]),
          setRatingsVal([ratingsData[finder].fields.Rating]))
        : 0;

      setMovieDetails(results);
    }
    getDetails();
  }, [ratingsData]);

  // ! provider
  useEffect(() => {
    async function getProvider() {
      const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers?&api_key=36d3acba2fb699efb449a8d506e9430a`;
      const response = await fetch(url);
      const myResults = await response.json();
      Object.keys(myResults.results).length === 0
        ? setProviderAvail("No")
        : setProviderAvail("Yes");
      setProviders(myResults);
    }
    getProvider();
  }, [id]);

  let providersRegions = [];
  for (let x in providersList.results) {
    providersRegions.push(x);
  }

  const regionList = providersRegions.map((x, idx) => {
    return <option value={x} key={"option" + idx}></option>;
  });

  // ! provider
  const selectorBox = () => {
    if (regionList.length !== 0) {
      return (
        <span>
          {regionList.length} provider available
          <div>
            <label htmlFor="regionlist-choice">Check Provider : </label>
            <input
              placeholder="Select region"
              list="regionlist"
              id="regionlist-choice"
              name="regionlist-choice"
              onChange={handleRegChange}
            />
            <datalist id="regionlist">{regionList}</datalist>
          </div>
        </span>
      );
    } else {
      return <span>Not Available:</span>;
    }
  };

  const handleRegChange = (event) => {
    const regionVal = event.target.value;
    if (providersRegions.includes(regionVal)) {
      setProviderSelected(providersList?.results[regionVal]);
    }
  };

  const providerBarWatch = providerSelected.flatrate?.map((x, idx) => {
    return (
      <div
        key={idx}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}
          style={{ borderRadius: "10px", height: "50%", width: "50%" }}
        />
        <p style={{ fontSize: "10px", textAlign: "center" }}>
          {x.provider_name}
        </p>
      </div>
    );
  });

  const providerBarBuy = providerSelected.buy?.map((x, idx) => {
    return (
      <div
        key={idx}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}
          style={{ borderRadius: "10px", height: "50%", width: "50%" }}
        />
        <p style={{ fontSize: "10px", textAlign: "center" }}>
          {x.provider_name}
        </p>
      </div>
    );
  });

  function trailerDisplay(trailer) {
    if (trailer?.success === false || trailer?.results.length === 0) {
      setOpenTrailer(false);
      setTrailerDisplay(false);
    } else {
      let videoFinder = trailer?.results?.filter((x) => x.type === "Trailer");
      // if (movieDetails.original_language !== "en")
      // {
      //     videoFinder = videoFinder?.filter(x => (x.name.includes("English")))
      // }
      setTrailerID(videoFinder[0].key);
      setOpenTrailer(true);
    }
  }

  const handleTrailerClick = async () => {
    async function getTrailer() {
      const url = `https://api.themoviedb.org/3/movie/${movieDetails?.imdb_id}/videos?&api_key=36d3acba2fb699efb449a8d506e9430a`;
      const response = await fetch(url);
      const myResults = await response.json();

      return myResults;
    }
    let trailer = await getTrailer();
    const getItem = trailerDisplay(trailer);
  };

  const ratings = () => {
    return (
      <input
        name="rating"
        type="range"
        max="10"
        min="0"
        step="0.1"
        label="1"
        value={ratingsVal}
        onChange={handleChange}
      ></input>
    );
  };

  const genres = movieDetails?.genres?.map((x, idx) => {
    return <span key={"genre" + idx}> {x.name} </span>;
  });

  const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours + " hours " + remainingMinutes + " minutes";
  };

  const convertDateFormat = (dateString) => {
    if (dateString !== undefined) {
      var parts = dateString.split("-");
      var rearrangedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
      return rearrangedDate;
    }
  };

  return (
    <>
      {/* {movieDetails} */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <img
          className="main-poster-container"
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          style={{ background: "grey", borderRadius: "10px" }}
          alt={movieDetails.original_title}
        />
        <div style={{ margin: "10px" }}></div>
        <div
          className="movie-details"
          style={{
            color: "black",
            background: "white",
            borderRadius: "30px",
            opacity: "98%",
            padding: "20px",
            width: "900px",
          }}
        >
          <div className="movie-description">
            <h1 style={{ display: "flex", alignItems: "center" }}>
              {movieDetails.title}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                {curvalue[1] === "yes" ? (
                  <img
                    name="favourite"
                    onClick={handleFavouriteClick}
                    style={{ width: "40px", height: "40px" }}
                    src="https://cdn-icons-png.flaticon.com/128/2550/2550357.png"
                  ></img>
                ) : (
                  <img
                    name="favourite"
                    onClick={handleFavouriteClick}
                    style={{ widht: "40px", height: "40px" }}
                    src="https://cdn-icons-png.flaticon.com/128/2550/2550223.png"
                  ></img>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                {curvalue[2] === "yes" ? (
                  <img
                    name="wishlist"
                    onClick={handleFavouriteClick}
                    style={{ width: "40px", height: "40px" }}
                    src="https://cdn-icons-png.flaticon.com/128/10525/10525533.png"
                  ></img>
                ) : (
                  <img
                    name="wishlist"
                    onClick={handleFavouriteClick}
                    style={{ widht: "40px", height: "40px" }}
                    src="https://cdn-icons-png.flaticon.com/128/10525/10525544.png"
                  ></img>
                )}
              </div>
              <div
                style={{
                  width: 60,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <CircularProgressbar
                  value={curvalue[0]}
                  maxValue={10}
                  text={`${curvalue[0] === undefined ? "-" : "⭐️ " + curvalue[0]}`}
                />
              </div>
            </h1>

            <div className="movie-title" style={{ textAlign: "left" }}>
              {movieDetails.tagline}
            </div>
            <hr />

            <div className="movie-title" style={{ textAlign: "left" }}>
              Genre: {genres}
            </div>
            <hr />

            <div className="movie-title" style={{ textAlign: "left" }}>
              Release Date : {convertDateFormat(movieDetails?.release_date)}
            </div>
            <hr />

            <div className="movie-title" style={{ textAlign: "left" }}>
              Movie Description : {movieDetails?.overview}
            </div>
            <hr />

            <div className="movie-title" style={{ textAlign: "left" }}>
              Runtime : {minutesToHours(movieDetails?.runtime)}
            </div>
            <hr />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: rateDisplay, marginLeft: "10px" }}>
              {ratings()}
            </div>
            <button
              name="rating"
              className="button-78"
              style={{ marginLeft: "10px", marginRight: "20px" }}
              onClick={handleRateClick}
            >
              Rate:{ratingsVal}
            </button>
            <div className="movie-buttons">
              <div>
                <button onClick={handleTrailerClick} className="button-73">
                  Watch Trailer
                </button>

                {trailerDisplayStatus === true ? (
                  <ModalVideo
                    chanel="youtube"
                    allowFullScreen={false}
                    onClose={() => setOpenTrailer(false)}
                    isOpen={isOpenTrailer}
                    videoId={trailerID}
                  />
                ) : (
                  <span
                    style={{
                      marginLeft: "10px",
                      color: "red",
                      fontSize: "20px",
                    }}
                  >
                    No trailer available ☹️
                  </span>
                )}
              </div>
            </div>
          </div>

          <hr />
          <div className="movie-title" style={{ textAlign: "left" }}>
            Provider Status : {selectorBox()}
            {providerBarWatch && (
              <div style={{ display: "flex" }}>
                Watch at: {providerBarWatch}
              </div>
            )}
            {providerBarBuy && (
              <div style={{ display: "flex" }}>Buy at: {providerBarBuy}</div>
            )}
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}
