import { useDispatch } from "react-redux";
import { getAlllUsersData } from "../DB/getAllUsersData";
import { ADD_CONTAINER, ADD_EMPTY_TODO, ADD_TABLERO, ADD_TODO, ALTER_CONTAINER_POSITION, ALTER_TODO_CONTAINER, ALTER_TODO_POSITION, EDIT_CONTAINER, EDIT_TABLERO, EDIT_TODO, MANAGE_TODO_FORM, REMOVE_CONTAINER, REMOVE_EMPTY_TODO, REMOVE_TABLERO, REMOVE_TODO, SET_ACTIVE_CONTAINER, SET_ACTIVE_TABLERO, SET_ACTIVE_TODO, SET_CONTAINERS, SET_DARK_MODE, SET_DRAG_CONTAINER, SET_FORM, SET_TABLEROS, SET_TAGS, SET_USERID } from "./types";

export const setUserid = (payload) => ({
    type: SET_USERID,
    payload
})

export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload
})

export const addEmptyTodo = (payload) => ({
    type: ADD_EMPTY_TODO,
    payload
})

export const editTodo = (payload) => ({
    type: EDIT_TODO,
    payload
})

export const removeTodo = (payload) => ({
    type: REMOVE_TODO,
    payload
})

export const removeEmptyTodo = (payload) => ({
    type: REMOVE_EMPTY_TODO,
    payload
})

export const setContainers = (payload) => ({
    type: SET_CONTAINERS,
    payload
})

export const addContainer = (payload) => ({
    type: ADD_CONTAINER,
    payload
})

export const editContainer = (payload) => ({
    type: EDIT_CONTAINER,
    payload
})

export const removeContainer = (payload) => ({
    type: REMOVE_CONTAINER,
    payload
})

export const setTableros = (payload) => ({
    type: SET_TABLEROS,
    payload
})

export const getDBData = (payload) => {
    return async(dispatch) => {
        const allData = await getAlllUsersData(payload);
        dispatch(setTableros(allData));
    }
}

export const addTablero = (payload) => ({
    type: ADD_TABLERO,
    payload
})

export const editTablero = (payload) => ({
    type: EDIT_TABLERO,
    payload
})

export const removeTablero = (payload) => ({
    type: REMOVE_TABLERO,
    payload
})

export const alterContainerPosition = (payload) => ({
    type: ALTER_CONTAINER_POSITION,
    payload
})

export const alterTodoContainer = (payload) => ({
    type: ALTER_TODO_CONTAINER,
    payload
})

export const alterTodoPosition = (payload) => ({
    type: ALTER_TODO_POSITION,
    payload
})

export const manageTodoForm = (payload) => ({
    type: MANAGE_TODO_FORM,
    payload
})

export const setActiveTablero = (payload) => ({
    type: SET_ACTIVE_TABLERO,
    payload
})

export const setActiveTodo = (payload) => ({
    type: SET_ACTIVE_TODO,
    payload
})

export const setActiveContainer = (payload) => ({
    type: SET_ACTIVE_CONTAINER,
    payload
})

export const setDragContainer = (payload) => ({
    type: SET_DRAG_CONTAINER,
    payload
})

export const setTags = (payload) => ({
    type: SET_TAGS,
    payload
})

export const setDarkMode = (payload) => ({
    type: SET_DARK_MODE,
    payload
})