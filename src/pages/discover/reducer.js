import * as actionTypes from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_FILTER: {
      const options = state[action.payload.field];
      const optionIndex = options.findIndex(
        ({ name }) => name === action.payload.name
      );

      options[optionIndex].isFiltered = !options[optionIndex]?.isFiltered;
      return { ...state, [action.payload.name]: options };
    }
    default:
      return state;
  }
}
