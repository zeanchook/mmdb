export default function TopRatedTab({ratingsData})
{
    console.log(ratingsData)

    let filterRatings = ratingsData?.filter(x => typeof(parseInt(x.fields.Rating)) === "number")
    filterRatings = filterRatings.filter(x => x.fields.Rating !== "-")
    console.log(filterRatings)

    // console.log(typeof(typeof(1)))

    filterRatings = filterRatings.sort((b,a) => 
    {
        const ratingA = parseInt(a.fields.Rating)
        const ratingB = parseInt(b.fields.Rating)
        if(ratingA > ratingB)
        {
         return 1;
        }
        else if(ratingA < ratingB)
        {
         return -1;
        }
        else{
         return 0;
        }
    })

    console.log(filterRatings)

    const topMMDBRatings = filterRatings.map((x,idx)=>
        {
            return <div key={idx} className="movie-poster-container"><img src={`https://image.tmdb.org/t/p/w500${x.fields.backgroundImage}`} ></img><a>{x.fields.MovieName}</a><a>⭐️ {x.fields.Rating}</a></div>
        })

    return(<>{topMMDBRatings}</>)
}