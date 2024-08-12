import { getrecentsearch } from "../service/getrecentsearch-at-service"

const result = await getrecentsearch();
console.log("result",result);

const initState = {
    result: result ? result : []

  }
  
  
  
  const rootReducer = (state = initState, action) => {
    console.log(state)
    console.log(action)

    if(action.type === "UPDATE_POST")
    {
        const item = action.item;
        const {recentSearch, searchString} = item;

        const newData2 = recentSearch.sort((a, b) => (a.fields.Name-b.fields.Name));
        let index = newData2.findIndex((item) => item.fields.Name === "1");
        let existIdx = newData2.findIndex(
          (item) => item.fields.SearchName === searchString
        );
        if (existIdx === -1) {
          if (index !== -1) {
            for (let i = newData2.length - 1; i > 0; i--) {
              newData2[i].fields.SearchName = newData2[i - 1].fields.SearchName;
            }
            newData2[index].fields.SearchName = searchString;
          }
        }
        return {...state,result:{records: newData2}};
    }
    return state;
  }
  
  export default rootReducer