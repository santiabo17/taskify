import { ADD_CONTAINER, ADD_EMPTY_TODO, ADD_TODO, ALTER_CONTAINER_POSITION, ALTER_TODO_CONTAINER, ALTER_TODO_POSITION, EDIT_CONTAINER, EDIT_TODO, MANAGE_TODO_FORM, REMOVE_CONTAINER, REMOVE_EMPTY_TODO, REMOVE_TODO, SET_ACTIVE_CONTAINER, SET_ACTIVE_TODO, SET_DARK_MODE, SET_DRAG_CONTAINER, SET_FILTER, SET_FORM, SET_TAGS } from "../actions/types"

const initialState = {
    todos: [['POR HACER', []], ['EN PROCESO', []], ['FINALIZADAS', []]],
    tags: [{color: '#006600', value: 'Development'}, {color: '#000099', value: 'Testing'}, {color: '#ff0000', value: 'Data Base'}, {color: '#660066', value: 'Urgent'}],
    filter: 'All',
    todoSelected: null,
    containerSelected: null,
    dragContainer: null,
    todoCardForm: false,
    darkMode: true
}

export const todosReducer = (state=initialState, action) => {
    switch (action.type){
        case ADD_TODO: {
            const todo = action.payload.todo;
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            const newTodos = [...state.todos];
            newTodos[containerIndex][1].push(todo);
            console.log('newTodos', newTodos);
            // if(containerIndex >= 0){
               return {...state, todos: newTodos}; 
            // }
        }  
        case ADD_EMPTY_TODO: {
            const newTodos = [...state.todos];
            const todo = action.payload.todo;
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            const existEmptyTodo = newTodos[containerIndex][1].findIndex(todo => todo?.status == 'empty') != -1;
            if(!existEmptyTodo){
                newTodos[containerIndex][1].push(todo);
            }
            return {...state, todos: newTodos};
        }
        case EDIT_TODO: {
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            const newTodos = [...state.todos];
            console.log(action.payload);
            if(action.payload.newTodo.todo.length > 0){
                // const equalNamedTodos = newTodos[containerIndex][1].filter(todo => todo.todo == action.payload.newTodo.todo).length;
                const todoIndex = newTodos[containerIndex][1].findIndex(todo => todo.id == action.payload.newTodo.id);
                newTodos[containerIndex][1][todoIndex] = action.payload.newTodo;
            } else {
                const todoIndex = newTodos[containerIndex][1].findIndex(todo => todo.id == action.payload.newTodo.id);
                // newTodos[containerIndex][1][todoIndex] = action.payload.newTodo;
                newTodos[containerIndex][1].splice(todoIndex, 1);
            }
            return {...state, todos: newTodos}; 
        }
        case REMOVE_TODO: {
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            const newTodos = [...state.todos];
            const todoIndex = newTodos[containerIndex][1].findIndex(todo => todo.id == action.payload.todoId);
            console.log('todo index', todoIndex);
            newTodos[containerIndex][1].splice(todoIndex, 1);
            console.log('borrando el todo vacio', newTodos);
            return {...state, todos: newTodos}; 
        }
        case SET_FILTER: {
            if(action.payload == "All"){
                return {...state, filter:"All"};
            } else {
                const selectedFilter = state.tags.findIndex(tag => tag.value == action.payload);
                return {...state, filter:selectedFilter};
            }
        }
        case REMOVE_EMPTY_TODO: {
            const newTodos = [...state.todos];
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            console.log('container del empty vacio', newTodos[containerIndex][0]);
            const todoIndex = newTodos[containerIndex][1].findIndex(todo => todo?.status == 'empty');
            newTodos[containerIndex][1].splice(todoIndex, 1);
            console.log('sin empty todo', todoIndex);
            console.log(newTodos);
            return {...state, todos: newTodos};
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
        case ALTER_CONTAINER_POSITION: {
            const oldContainerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            const newTodos = [...state.todos];
            const container = newTodos.splice(oldContainerIndex, 1)[0];
            newTodos.splice(action.payload.newIndex, 0, container);
            return {...state, todos: newTodos}
        }
        case ALTER_TODO_CONTAINER: {
            const oldContainerIndex = state.todos.findIndex(container => container[0] == action.payload.containers.old);
            const newContainerIndex = state.todos.findIndex(container => container[0] == action.payload.containers.new);
            const newTodos = [...state.todos];
            const oldTodoIndex = newTodos[oldContainerIndex][1].findIndex(todo => todo.id == action.payload.todo.id);
            newTodos[oldContainerIndex][1].splice(oldTodoIndex, 1);
            newTodos[newContainerIndex][1].push(action.payload.todo);
            return {...state, todos: newTodos, todoSelected: {...state.todoSelected, container: action.payload.containers.new}}
        }
        case ALTER_TODO_POSITION: {
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            const newTodos = [...state.todos];
            const cantContainerTodos = newTodos[containerIndex][1].length;
            const oldTodoIndex = newTodos[containerIndex][1].findIndex(todo => todo.id == action.payload.todo.id);
            if(cantContainerTodos == 0){
                console.log('first');
                newTodos[containerIndex][1][0] = action.payload.todo;
            } else if(action.payload.newIndex >= cantContainerTodos && newTodos[containerIndex][1][cantContainerTodos - 1].id != action.payload.todo.id){
                console.log('last');
                newTodos[containerIndex][1].splice(oldTodoIndex, 1);
                newTodos[containerIndex][1][cantContainerTodos] = action.payload.todo;
            } else if(action.payload.newIndex < cantContainerTodos && newTodos[containerIndex][1][action.payload.newIndex].id != action.payload.todo.id) {
                console.log('into');
                newTodos[containerIndex][1].splice(oldTodoIndex, 1);
                newTodos[containerIndex][1].splice(action.payload.newIndex, 0, action.payload.todo);
            }
            return {...state, todos: newTodos}
        }
        case MANAGE_TODO_FORM:
            return {...state, todoCardForm: action.payload}
        case SET_ACTIVE_TODO:
            return {...state, todoSelected: action.payload}
        case SET_ACTIVE_CONTAINER:
                return {...state, containerSelected: action.payload}
        case SET_DRAG_CONTAINER:
            return {...state, dragContainer: action.payload}
        case SET_TAGS:
            return {...state, tags: action.payload}
        case SET_DARK_MODE:
            return {...state, darkMode: action.payload}
        default:
            return state
    }
}