import { useNavigate } from "react-router-dom";

export default function TopMMDBRatings({ratingsData})
{

    // console.log(ratingsData[0].fields.Rating)

    let filterRatings = ratingsData?.filter(x => typeof(parseInt(x.fields.Rating)) === "number")
    filterRatings = filterRatings.filter(x => x.fields.Rating !== "-")
    // console.log(filterRatings)

    // console.log(typeof(typeof(1)))

    const navigate = useNavigate();

    const handleMovDetails = (id) =>
    {
        navigate("/"+id);
    }
    filterRatings = filterRatings.slice(0,5)
    const topMMDBRatings = filterRatings.map((x,idx)=>
        {
            return <div key={idx} className="movie-poster-container" onClick={() => handleMovDetails(x.fields.MovieID)}><img src={`https://image.tmdb.org/t/p/w500${x.fields.backgroundImage}`} ></img><a>MMDB: {x.fields.Rating}</a></div>
        })
    
    // console.log(topMMDBRatings.length)
    return((topMMDBRatings.length !== 0) &&
        <div style={{display:"flex",width:"50%"}}>MMDB Top Rated:
        {topMMDBRatings}
        </div>
    )
}