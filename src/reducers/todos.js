import { ADD_CONTAINER, ADD_TODO, EDIT_CONTAINER, EDIT_TODO, MANAGE_TODO_FORM, REMOVE_CONTAINER, REMOVE_TODO, SET_ACTIVE_TODO, SET_FORM } from "../actions/types"

const initialState = {
    todos: [['POR HACER', []], ['EN PROCESO', []], ['FINALIZADAS', []]],
    tags: {DEVELOPMENT: {color: 'green', value: 'Development'}, TESTING: {color: 'yellow', value: 'Testing'}, DATA_BASE: {color: 'red', value: 'Data Base'}},
    todoSelected: null,
    todoCardForm: false
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
            console.log(action.payload);
            console.log(state.todos[0][1][0].id);
            const todoIndex = newTodos[containerIndex][1].findIndex(todo => todo.id == action.payload.newTodo.id);
            newTodos[containerIndex][1][todoIndex] = action.payload.newTodo;
            console.log(newTodos);
            if(containerIndex >= 0){
               return {...state, todos: newTodos}; 
            }
        }
        case REMOVE_TODO: {
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            const newTodos = [...state.todos];
            const todoIndex = newTodos[containerIndex][1].findIndex(todo => todo.id == action.payload.todoId);
            newTodos[containerIndex][1].splice(todoIndex, 1);
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
        case MANAGE_TODO_FORM:
            return {...state, todoCardForm: action.payload}
        case SET_ACTIVE_TODO:
            return {...state, todoSelected: action.payload}
        default:
            return state
    }
}