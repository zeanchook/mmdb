import SearchBar from "./SearchBar"
import { Link} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { listgenres } from "./service/genre-service"

import { useEffect, useState } from "react";




export default function NavBar({handleSearch,setSearch,searchString,handlePress})
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

    console.log(genreTabSorted)

    const genreList = genreTabSorted?.map(x=>
        {
            // eslint-disable-next-line react/jsx-key
            return(<div ><Link to={`/genre/${x?.fields?.id}`} style={{ textDecoration: 'none',color:"white" }} name={x?.fields?.id}>{x?.fields?.name}</Link></div>)
        })

        console.log(genreList)

    return(

    //     <div className="topnav" >
    // <Link to="/"><h1>MMDB</h1></Link> 
    // <Link to="/toprated"><h1>Top Rated</h1></Link> 
    // <Link to="/favourite"><h1>Favourite</h1></Link> 
    // <Link to="/wishlist"><h1>Wishlists</h1></Link> 
    // <Link to="/genre"><h1>Genre</h1></Link> 
    // <SearchBar handleSearch={handleSearch} setSearch={setSearch} 
    //     searchString={searchString} handlePress={handlePress}/>
        
    // </div>

        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
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
              <Nav.Link ><Link style={{ textDecoration: 'none',color:"white" }} to="/favourite">Favourite</Link> </Nav.Link>
              <Nav.Link ><Link style={{ textDecoration: 'none',color:"white" }} to="/wishlist">Wishlists</Link> </Nav.Link>

              <NavDropdown title="Genre" id="navbarScrollingDropdown">
                <NavDropdown.Item >
                    {genreList}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search
              </Button> */}
              <SearchBar handleSearch={handleSearch} setSearch={setSearch} 
        searchString={searchString} handlePress={handlePress}/>
            {/* </Form> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

{/* <div className="topnav" >
    <Link to="/"><h1>MMDB</h1></Link> 
    <Link to="/toprated"><h1>Top Rated</h1></Link> 
    <Link to="/favourite"><h1>Favourite</h1></Link> 
    <Link to="/wishlist"><h1>Wishlists</h1></Link> 
    <Link to="/genre"><h1>Genre</h1></Link> 
    <SearchBar handleSearch={handleSearch} setSearch={setSearch} 
        searchString={searchString} handlePress={handlePress}/>
        
    </div> */}