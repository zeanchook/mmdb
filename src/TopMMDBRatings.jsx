import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';



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

    // topMMDBRatings.length === 0
    
        return(<div style={{display:"flex", alignContent:"center",justifyContent:"center"}}>{status === "loading" ? <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> : 
      topMMDBRatings.length === 0 ? "No recommended movie at the moment" :
        <div style={{display:"flex",alignContent:"center",justifyContent:"center",flexDirection:"column"}}>
            <div style={{textAlign:"center"}}>New Upcoming Movies:</div>
            <div style={{display:"flex",alignContent:"center",justifyContent:"center"}}>{topMMDBRatings}</div>
        </div>}
        </div>)
    
}