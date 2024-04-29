export const getMovDetails = async(id) =>
{
    
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US?&api_key=36d3acba2fb699efb449a8d506e9430a`;
        const response = await fetch(url)
        const myResults = await response.json();
        return myResults
          
}