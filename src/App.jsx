import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Test from "./Test"
import MovieDetails from "./MovieDetails"

import { Route, Routes } from "react-router-dom";


function App() {
  // const [ratings, setMyRatings] = useState([]);

  const [ratingsData, setRatingsData] = useState([]);

  const handleRatings = (returnRatings,id,title,poster) =>
  {
    let newData = ratingsData
    let finder = newData.findIndex(x => parseInt(x.fields.MovieID) === id)
    let ratingsChanged = {change: "no"}

    if(finder !== -1)
    {
      newData[finder].fields.Rating !== returnRatings ? ratingsChanged = {change: "yes"} : 0

    let newData2 = [
      {id: newData[finder].id,
      createdTime: newData[finder].createdTime, fields:{MovieName: title,MovieID: id,Rating: returnRatings, ratingsChanged,backgroundImage: poster}},
      ...newData.slice(0, finder),
      ...newData.slice(finder + 1)]
      console.log(newData2)
      setRatingsData(newData2)
    }
    else{
      let newdata3 = [
        {id: "new",
      createdTime: "newtime", fields:{MovieName: title,MovieID: id,Rating: returnRatings, ratingsChanged,backgroundImage: poster}},
    ...newData]
    setRatingsData(newdata3)
    }
    
  }
  // console.log("ratingsData",ratingsData)

  const updateRating = () =>
  {
    async function createRatings(fields) {
      // console.log("inside",x)
    const url = `https://api.airtable.com/v0/app6jeHx0D6EIgyYt/Top%20MMDB%20Ratings/`;
    const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
    const data = {
      fields:
      {
      MovieName: fields?.MovieName,
      MovieID: JSON.stringify(fields?.MovieID),
      Rating: fields?.Rating,
      backgroundImage: fields?.backgroundImage
      }
    };
    const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),})
    const myRatings = await response.json();
    // console.log("thisone !!!!:",myRatings)

    let finder = ratingsData.findIndex(x => parseInt(x.fields.MovieID) === parseInt(myRatings.fields.MovieID))
    setRatingsData([{...myRatings}, ...ratingsData.slice(0, finder), ...ratingsData.slice(finder + 1)])
  }


  async function updateRatings(x) {
    // console.log("inside",x)
  const url = `https://api.airtable.com/v0/app6jeHx0D6EIgyYt/Top%20MMDB%20Ratings/${x.id}`;
  const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
  const headers = {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  }
  const data = {
    fields:
    {
    Rating: x.fields?.Rating
    }
  };
  const response = await fetch(url, {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify(data),})
  const myRatings = await response.json();
  // console.log("thisone !!!!:",myRatings)
}


  ratingsData.forEach(x => 
    {
      if(x.id === "new")
      {
          createRatings(x.fields);
      }
      else if(x.fields.ratingsChanged?.change === "yes")
      {
            updateRatings(x)
            // console.log(x)
      }
    })

}

  // ! get first data airtable for Recent Search
  useEffect(() => {
    async function mmdbRatingstable() {
      const url = "https://api.airtable.com/v0/app6jeHx0D6EIgyYt/Top%20MMDB%20Ratings";
      const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
      const response = await fetch(url,
        {headers: headers});
      const reponseData = await response.json();
      // console.log(reponseData.records)
      setRatingsData(reponseData?.records)
      // setMyRatings(reponseData?.records)
    }
    mmdbRatingstable();
  }, []);

  useEffect(() => {updateRating()}, [ratingsData]);

  return (
    <>

    <Routes>
          <Route path="/" element={<Test ratingsData={ratingsData}/>} />
          <Route path="/mmdb/:id" element={<MovieDetails handleRatings={handleRatings}/>} />
          {/* <Route path="/holidays/:holidayId" element={<HolidayPage />} />
          <Route path="/holidays/edit" element={<EditHolidayPage />} /> */}
    </Routes>
    </>
  )
}

export default App
