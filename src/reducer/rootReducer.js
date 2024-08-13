import { getrecentsearch } from "../service/getrecentsearch-at-service";

const result = await getrecentsearch();
console.log("result", result);

const initState = {
  result: result ? result : [],
};

export const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_POST": {
      const item = action.item;

      const { result } = state;
      const newData2 = result.records.sort(
        (a, b) => a.fields.Name - b.fields.Name
      );
      let index = newData2.findIndex((item) => item.fields.Name === "1");
      let existIdx = newData2.findIndex(
        (item) => item.fields.SearchName === item
      );
      if (existIdx === -1) {
        if (index !== -1) {
          for (let i = newData2.length - 1; i > 0; i--) {
            newData2[i].fields.SearchName = newData2[i - 1].fields.SearchName;
          }
          newData2[index].fields.SearchName = item;
        }
      }
      return { ...state, result: { records: newData2 } };
    }
    default:
      return state;
  }
};

export default rootReducer;
