import { useContext } from "react";
import { DataContext } from "../App";

export default function Wishlist() {
  const contextPassed = useContext(DataContext);
  const ratingsData = contextPassed[1];

  let filterRatings = ratingsData?.filter((x) => x.fields.WishList === "yes");

  const topMMDBRatings = filterRatings.map((x, idx) => {
    return (
      <div
        key={idx}
        className="movie-poster-container"
        style={{ margin: "30px", display: "flex", flexWrap: "wrap" }}
        onClick={() => contextPassed[0](x.fields.MovieID)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${x.fields.backgroundImage}`}
        ></img>
        <a>{x.fields.MovieName}</a>
        <a>⭐️ {x.fields.Rating}</a>
        <a style={{ fontSize: "10px" }}>
          Provider Available: {x.fields.Provider}
        </a>
      </div>
    );
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
      }}
    >
      <h1>Wishlist</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}></div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {topMMDBRatings}
      </div>
    </div>
  );
}
