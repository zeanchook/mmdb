import SearchBar from "./SearchBar"
import { Link} from "react-router-dom";

export default function NavBar({handleSearch,setSearch,searchString,handlePress})
{
    return(<div className="topnav">
    <Link to="/"><h1>My Movie Database MMDB</h1></Link> 
    <SearchBar handleSearch={handleSearch} setSearch={setSearch} 
        searchString={searchString} handlePress={handlePress}/>
    </div>)
}