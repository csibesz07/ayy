import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelect} from "../selector";
import {select} from "../selectorActions";

const makeMapStateToProps= () => {
    const getSelectedName = createSelect();
    return (state,props) => ({current: getSelectedName(state,props)})
}

const actions = (props) =>  ({onClick : (name) => select(props.storeID,name)});

export default (component) => connect(makeMapStateToProps, createActionsUsesProps(actions))(component);
