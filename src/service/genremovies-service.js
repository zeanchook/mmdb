export const getMovies = async(id,pageState) =>
{
  console.log(pageState)
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=36d3acba2fb699efb449a8d506e9430a&with_genres=${id}&page=${pageState}`;
  const response = await fetch(url)
  const reponseData = await response.json();
//   console.log(reponseData)
  return reponseData;        
}