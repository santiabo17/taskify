import { ADD_CONTAINER, ADD_EMPTY_TODO, ADD_TODO, ALTER_CONTAINER_POSITION, ALTER_TODO_CONTAINER, ALTER_TODO_POSITION, EDIT_CONTAINER, EDIT_TODO, MANAGE_TODO_FORM, REMOVE_CONTAINER, REMOVE_EMPTY_TODO, REMOVE_TODO, SET_ACTIVE_CONTAINER, SET_ACTIVE_TODO, SET_DRAG_CONTAINER, SET_FORM, SET_TAGS } from "./types";

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