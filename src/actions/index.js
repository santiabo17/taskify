import { ADD_CONTAINER, ADD_TODO, EDIT_CONTAINER, EDIT_TODO, REMOVE_CONTAINER, REMOVE_TODO, SET_FORM } from "./types";

export const addTodo = (payload) => ({
    type: ADD_TODO,
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

export const setForm = (payload) => ({
    type: SET_FORM,
    payload
})