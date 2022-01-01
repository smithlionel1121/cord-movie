import CheckBox from "../checkbox";
import { TOGGLE_GENRE_FILTER } from "../../pages/discover/actions";

const ExpandableFilterList = ({ list, field, dispatch }) => {
  return list.map((filter) => (
    <li key={filter.id}>
      <CheckBox
        label={filter.name}
        checked={!!filter?.isFiltered}
        onChange={() =>
          dispatch({
            type: TOGGLE_GENRE_FILTER,
            payload: filter.name,
          })
        }
      />
    </li>
  ));
};

export default ExpandableFilterList;
