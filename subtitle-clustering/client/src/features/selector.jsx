import {createSelector} from "reselect";

const select = state => state.selected;

export const createSelect = () => createSelector(
    (state,props) => state.selector[props.storeID].name,
    selected => selected
);
