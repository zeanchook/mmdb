import SearchBar from "./SearchBar"
import { Link} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import RecentSearch from "./RecentSearch"

import { listgenres } from "../service/genre-service"


import { useEffect, useState } from "react";


export default function NavBar({handleSearch,setSearch,searchString,handlePress,recentSearch})
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

    const genreTabSorted = genreTab?.records?.sort((a,b) =>
    {
        if(a.fields.name > b.fields.name)
        {
            return 1;
        }
        else if(a.fields.name < b.fields.name)
        {
            return -1;
        }
        else{
            return 0;
        }
    })

    const genreList = genreTabSorted?.map((x,idx)=>
        {
            // eslint-disable-next-line react/jsx-key
            return(<div key={idx}><Link to={`/genre/${x?.fields?.id}`}  style={{ textDecoration: 'none',color:"white" }} name={x?.fields?.id}>{x?.fields?.name}</Link></div>)
        })


  
    return(

  
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" style={{display:"flex",justifyItems:"center"}}> 
        <Container fluid>
          <Navbar.Brand >MMDB</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link ><Link style={{ textDecoration: 'none',color:"white"}} to="/">Home</Link></Nav.Link>

              <Nav.Link ><Link style={{ textDecoration: 'none',color:"white"}} to="/toprated">Top Rated</Link> </Nav.Link>
              <Nav.Link ><Link style={{ textDecoration: 'none',color:"white"}} to="/recommendation">Recommendation</Link> </Nav.Link>
              <Nav.Link ><Link style={{ textDecoration: 'none',color:"white" }} to="/favourite">Favourite</Link> </Nav.Link>
              <Nav.Link ><Link style={{ textDecoration: 'none',color:"white" }} to="/wishlist">Wishlists</Link> </Nav.Link>

              <NavDropdown title="Genre" id="navbarScrollingDropdown">
                <NavDropdown.Item >
                    {genreList}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
              
             <RecentSearch recentSearch={recentSearch} handleSearch={handleSearch}/>
         
              <SearchBar handleSearch={handleSearch} setSearch={setSearch} 
        searchString={searchString} handlePress={handlePress}/>
            {/* </Form> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
