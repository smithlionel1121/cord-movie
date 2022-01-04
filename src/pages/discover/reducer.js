import * as actionTypes from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_FILTER: {
      const { field, name, radio } = action.payload;

      const options = state[field];
      const optionIndex = options.findIndex((option) => option.name === name);

      if (radio) {
        options.forEach((option, index) => {
          if (optionIndex !== index) option.isFiltered = false;
        });
      }

      options[optionIndex].isFiltered = !options[optionIndex]?.isFiltered;
      return { ...state, [name]: options };
    }
    default:
      return state;
  }
}
