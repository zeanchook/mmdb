export const posttopratings = async(fields) =>
{
    
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
          backgroundImage: fields?.backgroundImage,
          Favourite: fields?.Favourite,
          Genre: fields?.Genre,
          WishList: fields?.WishList,
          Provider: fields?.Provider
          }
        };
        const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),})
        const myRatings = await response.json();
    
        return myRatings;
            
}