export default function Favourite({ratingsData})
{
    // console.log(ratingsData[0].fields.Rating)

    let filterRatings = ratingsData?.filter(x => (x.fields.Favourite) === "yes")
    filterRatings = filterRatings.filter(x => x.fields.Rating !== "-")
    console.log(filterRatings)

    // console.log(typeof(typeof(1)))


    const topMMDBRatings = filterRatings.map((x,idx)=>
        {
            return <div key={idx} className="movie-poster-container"><img src={`https://image.tmdb.org/t/p/w500${x.fields.backgroundImage}`} ></img><a>{x.fields.MovieName}</a><a>⭐️ {x.fields.Rating}</a></div>
        })
        
    return (<>{topMMDBRatings}</>)
}