export const getrecentsearch = async() =>
{
    
    
        const url = "https://api.airtable.com/v0/app6jeHx0D6EIgyYt/RecentSearch";
        const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
        const headers = {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
        const response = await fetch(url,
          {headers: headers});
        const reponseData = await response.json();
        return reponseData;
      
          
}