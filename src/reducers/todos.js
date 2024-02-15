import { ADD_CONTAINER, ADD_TODO, EDIT_CONTAINER, EDIT_TODO, REMOVE_CONTAINER, REMOVE_TODO, SET_FORM } from "../actions/types"

const initialState = {
    todos: [['POR HACER', []], ['EN PROCESO', []], ['FINALIZADAS', []]],
    status: ['DONE', 'PROCESS', 'NOT_STARTED'],
    form: 'none'
}

export const todosReducer = (state=initialState, action) => {
    switch (action.type){
        case ADD_TODO: {
            const todo = action.payload.todo;
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            const newTodos = [...state.todos];
            newTodos[containerIndex][1].push(todo);
            console.log('newTodos', newTodos);
            if(containerIndex >= 0){
               return {...state, todos: newTodos}; 
            }
        }  
        case EDIT_TODO: {
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            const newTodos = [...state.todos];
            const todoIndex = newTodos[containerIndex][1].findIndex(todo => todo.todo == action.payload.oldTodo.todo);
            newTodos[containerIndex][1][todoIndex] = action.payload.newTodo;
            console.log('todoIndex', todoIndex);
            console.log('newTodos', newTodos);
            if(containerIndex >= 0){
               return {...state, todos: newTodos}; 
            }
        }
        case REMOVE_TODO: {
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            const newTodos = [...state.todos];
            const todoIndex = newTodos[containerIndex][1].findIndex(todo => todo.todo == action.payload.todo.todo);
            console.log('todoIndex', todoIndex);
            newTodos[containerIndex][1].splice(todoIndex, 1);
            console.log('newTodos', newTodos);
            if(containerIndex >= 0){
               return {...state, todos: newTodos}; 
            }
        }
        case ADD_CONTAINER: {
            return {...state, todos: [...state.todos, [action.payload, []]]}
        }
        case EDIT_CONTAINER: {
            const newTodos = [...state.todos];
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload.oldName);
            if(containerIndex){
                newTodos[containerIndex][0] = action.payload.newName;
                return {...state, todos: newTodos};
            }
        }
        case REMOVE_CONTAINER: {
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload);
            const newTodos = [...state.todos];
            newTodos.splice(containerIndex, 1);
            return {...state, todos: newTodos};
        }
        case SET_FORM:
                return {...state, form: action.payload}
        default:
            return state
    }
}