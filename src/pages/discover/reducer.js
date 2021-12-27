import { TOGGLE_GENRE_FILTER } from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_GENRE_FILTER: {
      const { genreOptions } = state;
      const genreIndex = genreOptions.findIndex(
        ({ name }) => name === action.payload
      );

      genreOptions[genreIndex].isFiltered =
        !genreOptions[genreIndex]?.isFiltered;
      return { ...state, genreOptions };
    }
    default:
      return state;
  }
}
