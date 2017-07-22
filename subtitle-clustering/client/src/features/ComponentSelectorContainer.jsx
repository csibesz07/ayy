import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelect} from "./selector";
import {select} from "./selectorActions";

import ComponentSelector from "./ComponentSelector";

const makeMapStateToProps= () => {
    const getSelectedName = createSelect();
    return (state,props) => ({current: getSelectedName(state,props)})
}

const actions = (props) =>  ({});

export default connect(makeMapStateToProps, createActionsUsesProps(actions))(ComponentSelector);
