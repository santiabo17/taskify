import { ADD_CONTAINER, ADD_TODO, EDIT_CONTAINER, EDIT_TODO, REMOVE_CONTAINER, REMOVE_TODO, SET_TAGS } from "../actions/types";

export const reduxLocalStorageMiddleware = store => next => action => {
    const actionsStorage = [ADD_TODO, EDIT_TODO, REMOVE_TODO, ADD_CONTAINER, EDIT_CONTAINER, REMOVE_CONTAINER, SET_TAGS];
    if(actionsStorage.includes(action.type)){
        console.log('hiajuuuuuu');
    }
    return next(action);
}