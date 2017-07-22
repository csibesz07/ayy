import {SELECTED,SELECTED_AND_TO_SELECTOR,SELECTED_AND_CHILD_TO_SELECTOR} from "./selectorConstants";
export function select(storeID,selected) {
    return {
        type : SELECTED,
        payload : {"storeID":storeID,
                  "selected":selected}
    };
}

export function selectAndChildToSelector(storeID,selectedID,childID,selected) {
  return {
      type : SELECTED_AND_CHILD_TO_SELECTOR,
      payload : {"storeID":storeID,
                "selectedID": selectedID,
                "childID": childID,
                "selected":selected}
  };
}

export function selectAndToSelector(storeID,selectedID,selected) {
    return {
        type : SELECTED_AND_TO_SELECTOR,
        payload : {"storeID":storeID,
                  "selectedID": selectedID,
                  "selected":selected}
    };
}
