import React from "react";
import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelect} from "./selector";
import {selectAndChildToSelected,selectAndToSelector,select} from "./selectorActions";

import NavContainer from "features/NavContainer"

import ModifiableStepper from "features/ModifiableStepper"


export default NavContainer(ModifiableStepper,(state,props) =>
                      ({components:
                          [...props.components,{name:"add",icon:"add green",title:"Hozzáad"}]
                      }))
