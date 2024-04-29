export const randomMovies = async() =>
{
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1?&api_key=36d3acba2fb699efb449a8d506e9430a`;
    const response = await fetch(url)
    const reponseData = await response.json();
    return reponseData;       
}

