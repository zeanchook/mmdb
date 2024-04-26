import { useNavigate } from "react-router-dom";


export default function TopMMDBRatings({ratingsData})
{

    // console.log(ratingsData)
    let filterRatings = ratingsData?.filter(x => typeof(parseInt(x.fields.Rating)) === "number")
    filterRatings = filterRatings.filter(x => x.fields.Rating !== "-")

    const navigate = useNavigate();

    const handleMovDetails = (id) =>
    {
        navigate("/movieresults/"+id);
    }
    

    filterRatings = filterRatings.sort( (b,a) => 
    {
        let ratingA = parseInt(a.fields.Rating)
        let ratingB = parseInt(b.fields.Rating)

        if(ratingA > ratingB) 
        {
            return 1;
        }
        if(ratingA < ratingB)
        {
            return -1;
        }
        return 0;
    })

    filterRatings = filterRatings.slice(0,5)

    const topMMDBRatings = filterRatings.map((x,idx)=>
    {
        return <div key={idx} className="movie-poster-container" onClick={() => handleMovDetails(x.fields.MovieID)}>
            <img src={`https://image.tmdb.org/t/p/w500${x.fields.backgroundImage}`} ></img><a>⭐️ {x.fields.Rating}</a></div>
    })

    
    return((topMMDBRatings.length !== 0) &&
        <div style={{display:"flex",width:"50%"}}>MMDB Top Rated:
        {topMMDBRatings}
        </div>
    )
}