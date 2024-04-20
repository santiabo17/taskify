import {applyMiddleware, compose, legacy_createStore as createStore} from 'redux';
import { thunk } from 'redux-thunk';
import { todosReducer } from './todos';
import { ADD_CONTAINER, ADD_TABLERO, ADD_TODO, ALTER_CONTAINER_POSITION, EDIT_CONTAINER, EDIT_TABLERO, EDIT_TODO, REMOVE_TABLERO } from '../actions/types';

// const storageTodos = JSON.parse(localStorage.getItem('todos'));
// const tagsTodos = JSON.parse(localStorage.getItem('todos_tags'));


// const initialState = {
//     todos: storageTodos ? storageTodos : [['POR HACER', []], ['EN PROCESO', []], ['FINALIZADAS', []]],
//     tags: tagsTodos ? tagsTodos : [{color: '#006600', value: 'Development'}, {color: '#000099', value: 'Testing'}, {color: '#ff0000', value: 'Data Base'}, {color: '#660066', value: 'Urgent'}],
//     todoSelected: null,
//     containerSelected: null,
//     dragContainer: null,
//     todoCardForm: false,
//     darkMode: true
// }
const initialState = {
    todos: [],
    tags: [],
    tableroSelected: null,
    todoSelected: null,
    containerSelected: null,
    dragContainer: null,
    todoCardForm: false,
    darkMode: true,
    userid: null
}

const logger = store => next => action => {
      console.log('will dispatch', action);
      const {getState, dispatch} = store;
      console.log('state', getState());
  
      // Call the next dispatch method in the middleware chain.
      const returnValue = next(action)
  
    //   console.log('state after dispatch', getState())
  
      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
    //   return returnValue
}

const BDSynchronizeMiddleware = store => next => action => {
    switch(action.type){
        case ADD_TODO: {
            const {getState, dispatch} = store;
            const state = getState();
            console.log('receiving event info', action.payload);
            const {todo, container} = action.payload;
            const newTodo = {tarea: todo.tarea, fecha: todo.fecha, id_container: container.id};
            fetch('http://localhost:3500/todos', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo)
            })
            .then(data => data.json())
            .then(data => {
                console.log('data', data)
                action = {...action, payload: {...action.payload, todo: {...action.payload.todo, id_todo: data.id}}};
                console.log('action', action);
                return(next(action));
            })
            .catch(error => {
                console.log('error', error);
                return;
            })
            break;
        }
        case EDIT_TODO: {
            console.log(action.payload);
            const {tarea, fecha, index_todo, id} = action.payload.todo;
            const nuevoTodo = {tarea, fecha, index_todo};
            fetch(`http://localhost:3500/containers/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoTodo)
            })
            .then(data => data.json())
            .then(data => {
                if(!data.error){
                    console.log('container editado exitosamente ' + action.payload.id);
                    return(next(action));
                } else {
                    console.log(data.error);
                }
            })
            .catch(error => {
                console.log('error', error);
            })
            break;
        }
        case ADD_TABLERO: {
            const {getState, dispatch} = store;
            const state = getState();
            const newTablero = {user_id: state.userid, nombre: action.payload};
            fetch('http://localhost:3500/tableros', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTablero)
            })
            .then(data => data.json())
            .then(data => {
                console.log('data', data)
                action = {...action, payload: {nombre: action.payload, id: data.id}};
                console.log('action', action);
                return(next(action));
            })
            .catch(error => {
                console.log('error', error);
                return;
            })
            break;
        }
        case REMOVE_TABLERO: {
            fetch(`http://localhost:3500/tableros/${action.payload}`, {
                method: 'DELETE'
            })
            .then(data => data.json())
            .then(data => {
                if(!data.error){
                    console.log('borrado tablero exitosamente ' + action.payload);
                    return(next(action));
                } else {
                    console.log(data.error);
                }
            })
            .catch(error => {
                console.log('error', error);
            })
            break;
        }
        case EDIT_TABLERO: {
            const nuevoNombre = {nombre: action.payload.newName};
            fetch(`http://localhost:3500/tableros/${action.payload.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoNombre)
            })
            .then(data => data.json())
            .then(data => {
                if(!data.error){
                    console.log('tablero editado exitosamente ' + action.payload.id);
                    return(next(action));
                } else {
                    console.log(data.error);
                }
            })
            .catch(error => {
                console.log('error', error);
            })
            break;
        }
        case ADD_CONTAINER: {
            const {getState, dispatch} = store;
            const state = getState();
            const newContainer = {id_tablero: action.payload.id_tablero, nombre: action.payload.nombre};
            fetch('http://localhost:3500/containers', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newContainer)
            })
            .then(data => data.json())
            .then(data => {
                console.log('data', data)
                action = {...action, payload: {...action.payload, id: data.id}};
                console.log('action', action);
                return(next(action));
            })
            .catch(error => {
                console.log('error', error);
                return;
            })
            break;
        }
        case EDIT_CONTAINER: {
            const nuevoNombre = {nombre: action.payload.newName};
            fetch(`http://localhost:3500/containers/${action.payload.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoNombre)
            })
            .then(data => data.json())
            .then(data => {
                if(!data.error){
                    console.log('container editado exitosamente ' + action.payload.id);
                    return(next(action));
                } else {
                    console.log(data.error);
                }
            })
            .catch(error => {
                console.log('error', error);
            })
            break;
        }
        case ALTER_CONTAINER_POSITION: {
            const {newIndex, id_tablero, container} = action.payload;
            const editedContainer = {index_container: newIndex, nombre: container.nombre};
            fetch(`http://localhost:3500/containers/${container.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedContainer)
            })
            .then(data => data.json())
            .then(data => {
                if(!data.error){
                    console.log('container editado exitosamente ' + action.payload.id);
                    return(next(action));
                } else {
                    console.log(data.error);
                }
            })
            .catch(error => {
                console.log('error', error);
            })
            break;
        }
        default: 
            return(next(action));
    }
}

const store = createStore(todosReducer, initialState, applyMiddleware(thunk, logger, BDSynchronizeMiddleware));
store.subscribe(() => {

    // const todos = store.getState().todos;
    // const stringifiedTodos = JSON.stringify(todos);
    // const tags = store.getState().tags;
    // const stringifiedTags = JSON.stringify(tags);
    // localStorage.setItem('todos', stringifiedTodos);
    // localStorage.setItem('todos_tags', stringifiedTags);
})

export { store }