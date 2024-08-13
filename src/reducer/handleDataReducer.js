import { gettopratings } from "../service/gettopratings-at-service";

const fetchRatingsData = await gettopratings();

const initRatingsState = {
  result: fetchRatingsData ? fetchRatingsData : [],
};

export const handleDataRedux = (state = initRatingsState, action) => {
  const { result } = state;
  const ratingsData = result.records;
console.log(action)
  switch (action.type) {
    case "UPDATE_DATA": {
      const { payload } = action;
      console.log("test");
      console.log(action,payload)
      const { type, items, returnRatings, providerDetails } = payload;

      let newData = ratingsData;
      let finder = newData.findIndex(
        (x) => parseInt(x.fields.MovieID) === items.id
      );
      const match = finder !== -1 ? true : false;

      let favourite = "no";
      let wishlist = "no";
      let rating = "-";
      let favouriteChanged = { change: "no" };
      let wishlistChanged = { change: "no" };
      let ratingsChanged = { change: "no" };

      if (match) {
        favourite = ratingsData[finder].fields?.Favourite;
        wishlist = ratingsData[finder].fields?.WishList;
        rating = ratingsData[finder].fields?.Rating;
      }

      switch (type) {
        case "favourite":
          favourite = match && favourite === "no" ? "yes" : "no";
          favouriteChanged = { change: "yes" };
          if (match) rating = "-";
          break;
        case "wishlist":
          wishlist = match && wishlist === "no" ? "yes" : "no";
          wishlistChanged = { change: "yes" };
          if (match) rating = "-";
          break;
        case "rating":
          if (match && rating !== returnRatings) {
            ratingsChanged = { change: "yes" };
            rating = returnRatings;
          } else {
            rating = returnRatings;
            wishlist = "no";
            favourite = "no";
          }
          break;
      }

      const getGenre = items.genres.map((item) => item.id).join(",");

      const updatedFields = {
        MovieName: items.title,
        MovieID: items.id,
        Rating: rating,
        ratingsChanged,
        backgroundImage: items.poster_path,
        Favourite: favourite,
        favouriteChanged,
        Genre: getGenre,
        WishList: wishlist,
        wishlistChanged,
        Provider: providerDetails,
      };

      if (match) {
        let updatedData = [
          { ...newData[finder], fields: updatedFields },
          ...newData.slice(0, finder),
          ...newData.slice(finder + 1),
        ];
        return { ...state, result: { records: updatedData } };
      } else {
        let newDataEntry = [
          { id: "new", createdTime: "newtime", fields: updatedFields },
          ...newData,
        ];
        return { ...state, result: { records: newDataEntry } };
      }
    }

    case "CREATE_DATA":
        {
            const myRatings = action.myRatings;
            let finder = ratingsData.findIndex(
                (x) => parseInt(x.fields.MovieID) === parseInt(myRatings.fields.MovieID)
              );
              console.log(myRatings)
              console.log(state)
              return { ...state, result: { records: [
                { ...myRatings },
                ...ratingsData.slice(0, finder),
                ...ratingsData.slice(finder + 1),
              ] } };
        }

    default:
      return state;
  }
};
