import CheckBox from "../checkbox";
import * as actionTypes from "../../pages/discover/actions";

const ExpandableFilterList = ({ list, field, dispatch, radio = false }) => {
  return list.map((filter) => (
    <li key={filter.id}>
      <CheckBox
        label={filter.name}
        radio={radio}
        checked={!!filter?.isFiltered}
        onChange={() =>
          dispatch({
            type: actionTypes.TOGGLE_FILTER,
            payload: { name: filter.name, field, radio },
          })
        }
      />
    </li>
  ));
};

export default ExpandableFilterList;
