export const getNewMovDetails = async() =>
{
    
        const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1?&api_key=36d3acba2fb699efb449a8d506e9430a`;
        const response = await fetch(url)
        const myResults = await response.json();
        // console.log(myResults)
        return myResults
          
}