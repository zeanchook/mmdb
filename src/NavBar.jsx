import SearchBar from "./SearchBar"
import { Link} from "react-router-dom";

export default function NavBar({handleSearch,setSearch,searchString,handlePress})
{
    return(<div className="topnav">
    <Link to="/"><h1>MMDB</h1></Link> 
    <Link to="/toprated"><h1>Top Rated</h1></Link> 
    <Link to="/favourite"><h1>Favourite</h1></Link> 
    <SearchBar handleSearch={handleSearch} setSearch={setSearch} 
        searchString={searchString} handlePress={handlePress}/>
    </div>)
}