import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import { todosReducer } from './todos';

const storageTodos = JSON.parse(localStorage.getItem('todos'));
const tagsTodos = JSON.parse(localStorage.getItem('todos_tags'));

const initialState = {
    todos: storageTodos ? storageTodos : [['POR HACER', []], ['EN PROCESO', []], ['FINALIZADAS', []]],
    tags: tagsTodos ? tagsTodos : [{color: '#006600', value: 'Development'}, {color: '#000099', value: 'Testing'}, {color: '#ff0000', value: 'Data Base'}, {color: '#660066', value: 'Urgent'}],
    todoSelected: null,
    containerSelected: null,
    dragContainer: null,
    todoCardForm: false,
    darkMode: true
}

const store = createStore(todosReducer, initialState);
store.subscribe(() => {
    const todos = store.getState().todos;
    const stringifiedTodos = JSON.stringify(todos);
    const tags = store.getState().tags;
    const stringifiedTags = JSON.stringify(tags);
    localStorage.setItem('todos', stringifiedTodos);
    localStorage.setItem('todos_tags', stringifiedTags);
})

export { store }