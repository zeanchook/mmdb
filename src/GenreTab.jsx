import { useEffect, useState } from "react";
import { Link} from "react-router-dom";

import { listgenres } from "./service/genre-service"


export default function GenreTab()
{
    const [genreTab, setGenreTab] = useState("")
    useEffect(() => {
    async function fetchData()
    {
        const results = await listgenres();
        setGenreTab(results)
    }    
    fetchData();
    
    }, []);

    const genreList = genreTab?.records?.map(x=>
        {
            // eslint-disable-next-line react/jsx-key
            return(<div><Link to={`/genre/${x?.fields?.id}`} name={x?.fields?.id}>{x?.fields?.name}</Link></div>)
        })

    // console.log(genreList)
    return(<>{genreList}</>)
}