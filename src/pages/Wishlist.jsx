import { useContext } from "react";
import { DataContext } from "../App";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Wishlist()
{
    const contextPassed = useContext(DataContext);
    const ratingsData = contextPassed[1];

    // console.log(ratingsData)

    let filterRatings = ratingsData?.filter(x => (x.fields.WishList) === "yes")
    console.log(filterRatings)

    const topMMDBRatings = filterRatings.map((x,idx)=>
        {
            return <div key={idx} className="movie-poster-container" style={{margin:"30px",display:"flex",flexWrap:"wrap"}} onClick={() => contextPassed[0](x.fields.MovieID)}>
            <img src={`https://image.tmdb.org/t/p/w500${x.fields.backgroundImage}`} ></img><a>{x.fields.MovieName}</a><a>⭐️ {x.fields.Rating}</a>
            <a style={{fontSize:"10px"}}>Provider Available: {x.fields.Provider}</a>
            </div>
        })
        
        return (<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        backgroundColor:"grey",height:"100%",width:"100%",position:"absolute",top:"0px",zIndex:"-1"}}>
            <h1>Wishlist</h1><div style={{display:"flex",flexWrap:"wrap"}}></div >
            <div style={{display:"flex",flexWrap:"wrap"}}>{topMMDBRatings}</div></div>)
    }