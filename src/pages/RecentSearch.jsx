import { useEffect } from "react";

export default function RecentSearch({recentSearch,handleSearch})
{
      useEffect(() => {
        async function recentSearchTable(x) {
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
        }
        
        recentSearch.forEach(x=> recentSearchTable(x));
      }, [recentSearch[0]?.fields?.SearchName]);

const handleClick =(event) =>
{
  handleSearch(event.target.innerHTML)
}

// eslint-disable-next-line react/prop-types
const recentSearchBarDisplay = recentSearch.map((x,idx)=>
  {
    // eslint-disable-next-line react/jsx-key
    return(
    <div key={idx} className="recent-search-bar" onClick={handleClick} style={{paddingLeft:"8px",paddingRight:"8px"}}>
      {x?.fields?.SearchName?.replace("%20"," ")}
    </div>)
  })


    return (<div style={{display:"flex",whiteSpace:"nowrap",fontSize:"12px"}}>
        {recentSearchBarDisplay}
    </div>);

}



