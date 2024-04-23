import SearchBar from "./SearchBar"
import { Link} from "react-router-dom";

export default function NavBar({handleSearch,setSearch,searchString,handlePress})
{
    return(<div class="topnav">
    <Link to="/"><h1>m</h1></Link> |
    <a><SearchBar handleSearch={handleSearch} setSearch={setSearch} 
        searchString={searchString} handlePress={handlePress}/></a>
    </div>)
}