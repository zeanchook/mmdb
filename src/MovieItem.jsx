import { useNavigate } from "react-router-dom";

export default function MovieItem({items,index,ratingsData})
{
    const navigate = useNavigate();

    const handleMovDetails = (id) =>
    {
        navigate("/"+id);
    }

    const index2 = ratingsData.findIndex(x=>
            parseInt(x.fields.MovieID) === items.id
        )

    let movieRatings = ""
    if (index2 !== -1)
    {
        movieRatings = "⭐️ :" + ratingsData[index2].fields.Rating
    }

    return(
        (items?.poster_path && (items?.popularity > 10)) && <div key={index} className="movie-poster-container" onClick={() => handleMovDetails(items.id)} >
              <img src={`https://image.tmdb.org/t/p/w500${items.poster_path}`} alt={items.original_title} />
              <div className="movie-title">{items.original_title}</div>
              <div className="movie-release-date">{items.release_date}</div>
              <div >{movieRatings}</div>
            </div>
    )
}