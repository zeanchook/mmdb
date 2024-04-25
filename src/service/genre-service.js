export const discovergenre = async(getRecGenre) =>
{
    console.log({getRecGenre})

        async function getGenreClass() {
            const url = "https://api.airtable.com/v0/app6jeHx0D6EIgyYt/Genre";
            const authToken = "patX97ZQi3d2FkxuA.8bfb13d450ef30d9b34d0d6367bdbcd8b987f24dfdf16a4d628b0b052729daad"
            const headers = {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          const response = await fetch(url,{headers: headers});
          const reponseData = await response.json();
          return reponseData;
        }

        let genres = await getGenreClass();
        // console.log(genres)

        // let finder = genres?.records?.findIndex(x => x.fields.id === getRecGenre[0].genre)
        // console.log(genres.records[finder].fields.id)
        const genreID = getRecGenre.slice(0, 3).map(genre => genre.genre).join(',');
        // console.log(genreID)
     
        async function getMovieGenre() {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=36d3acba2fb699efb449a8d506e9430a&with_genres=${genreID}`;
            const response = await fetch(url)
          const reponseData = await response.json();
          return reponseData;
        }

        let genreData = await getMovieGenre();
        const data = genreData;
        // console.log(genreData)

        let data2 = [];
        data2[0] = data;
        data2[1] = genreID;
        data2[2] = genres;

        // console.log(data2)

        return (data2);
}