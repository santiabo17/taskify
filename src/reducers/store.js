import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import { todosReducer } from './todos';

const storageTodos = localStorage.getItem('todos_ls') != 'undefined' ? JSON.parse(localStorage.getItem('todos_ls')) : [];
const tagsTodos = localStorage.getItem('todos_tags_ls') != 'undefined' ? JSON.parse(localStorage.getItem('todos_tags_ls')) : [];

const initialState = {
    todos: storageTodos ? storageTodos : [['POR HACER', []], ['EN PROCESO', []], ['FINALIZADAS', []]],
    tags: tagsTodos ? tagsTodos : [{color: '#006600', value: 'Development'}, {color: '#000099', value: 'Testing'}, {color: '#ff0000', value: 'Data Base'}, {color: '#660066', value: 'Urgent'}],
    filter: 'All',
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
    localStorage.setItem('todos_ls', stringifiedTodos);
    localStorage.setItem('todos_tags_ls', stringifiedTags);
})

export { store }