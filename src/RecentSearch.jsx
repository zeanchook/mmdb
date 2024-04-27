import { useEffect, useState } from "react";

export default function RecentSearch({recentSearch,handleSearch})
{
    // console.log("recentSearch",recentSearch)

    const [recentSearchIDs,setrecentSearchIDs] = useState([])

    // airtable fetch
    // useEffect(() => {
    //     async function recentSearchTable() {
    //       const url = "https://api.airtable.com/v0/app6jeHx0D6EIgyYt/RecentSearch";
    //       const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
    //       const headers = {
    //         'Authorization': `Bearer ${authToken}`,
    //         'Content-Type': 'application/json'
    //       }
    //       const response = await fetch(url,
    //         {headers: headers});
    //       const reponseData = await response.json();
    //       setrecentSearchIDs(reponseData);
    //     }
    //     recentSearchTable();
    //   }, [recentSearch]);

    //   console.log("recentSearch",recentSearch)
    //   console.log("recentSearchIDs",recentSearchIDs)

    //   const recentSearchItems = recentSearchID

      // let newData = recentSearchIDs?.records?.map((item,idx) => ({ id: item?.id, searchName: item?.fields.SearchName }));
    //   console.log("newdata:",newData)
    //   const dataLatest = recentSearchIDs.map( (x,idx) => 
    //     {
    //         x.records[idx]
    //     })
    //   console.log(dataLatest)

    //   recentSearch.map(x => )

    // console.log(recentSearch)
      useEffect(() => {
        async function recentSearchTable(x) {
            // console.log("inside",x)
          const url = `https://api.airtable.com/v0/app6jeHx0D6EIgyYt/RecentSearch/${x.id}`;
          const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
          const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
          const data = {
            fields:
            {
              SearchName: x.fields.SearchName
            }
          };
          const response = await fetch(url, {
                  method: "PATCH",
                  headers: headers,
                  body: JSON.stringify(data),})
          const myRatings = await response.json();
          // console.log(myRatings)
        }
        
        recentSearch.forEach(x=> recentSearchTable(x));
      }, [recentSearch[0]?.fields?.SearchName]);


// console.log(recentSearchBar[0].fields.SearchName)
const handleClick =(event) =>
{
  handleSearch(event.target.innerHTML)
}

// eslint-disable-next-line react/prop-types
const recentSearchBarDisplay = recentSearch.map((x,idx)=>
  {
    // eslint-disable-next-line react/jsx-key
    return(
    <div key={idx} className="recent-search-bar" onClick={handleClick} style={{textAlign:"center"}}>
      {x?.fields?.SearchName?.replace("%20"," ")}
    </div>)
  })


    return (<div style={{display:"flex"}}>
        {recentSearchBarDisplay}
    </div>);

}



