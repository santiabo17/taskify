import { ADD_CONTAINER, ADD_EMPTY_TODO, ADD_TABLERO, ADD_TODO, ALTER_CONTAINER_POSITION, ALTER_TODO_CONTAINER, ALTER_TODO_POSITION, EDIT_CONTAINER, EDIT_TABLERO, EDIT_TODO, MANAGE_TODO_FORM, REMOVE_CONTAINER, REMOVE_EMPTY_TODO, REMOVE_TABLERO, REMOVE_TODO, SET_ACTIVE_CONTAINER, SET_ACTIVE_TABLERO, SET_ACTIVE_TODO, SET_CONTAINERS, SET_DARK_MODE, SET_DRAG_CONTAINER, SET_FORM, SET_TABLEROS, SET_TAGS, SET_USERID } from "../actions/types"

const initialState = {
    todos: [['TABLERO1', ['POR HACER', []], ['EN PROCESO', []], ['FINALIZADAS', []]]],
    tags: [{color: '#006600', value: 'Development'}, {color: '#000099', value: 'Testing'}, {color: '#ff0000', value: 'Data Base'}, {color: '#660066', value: 'Urgent'}],
    tableroSelected: null,
    todoSelected: null,
    containerSelected: null,
    dragContainer: null,
    todoCardForm: false,
    darkMode: true,
    userid: null
}

export const todosReducer = (state=initialState, action) => {
    switch (action.type){
        case SET_USERID: {
            return {...state, userid: action.payload}
        }
        case ADD_TODO: {
            
            // const containerIndex = state.todos.findIndex(container => container[0] == action.payload.container);
            // const newTodos = [...state.todos];
            // newTodos[containerIndex][1].push(todo);
            // return {...state, todos: newTodos}; 

            const {todo, container} = action.payload;
            console.log('container', container);
            console.log('todo', todo);
            const newTodos = [...state.todos];
            const tableroIndex = newTodos.findIndex(([tablero, container]) => tablero.id == state.tableroSelected);
            const containerIndex = newTodos[tableroIndex][1].findIndex(([containerData, todos]) => containerData.id == container.id);
            newTodos[tableroIndex][1][containerIndex][1].push(todo);
            return {...state, todos: newTodos}
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
            const {todo, container} = action.payload;
            const newTodos = [...state.todos];
            const tableroIndex = newTodos.findIndex(([tablero, container]) => tablero.id == state.tableroSelected);
            const containerIndex = newTodos[tableroIndex][1].findIndex(([containerData, todos]) => containerData.id == container.id);
            if(todo.tarea.length > 0){
                const todoIndex = newTodos[tableroIndex][1][containerIndex][1].findIndex(todoData => todoData.id == todo.id);
                newTodos[tableroIndex][1][containerIndex][1][todoIndex] = todo;
            } else {
                const todoIndex = newTodos[tableroIndex][1][containerIndex][1].findIndex(todoData => todoData.id == todo.id);
                newTodos[tableroIndex][1][containerIndex][1].splice(todoIndex, 1);
            }
            return {...state, todos: newTodos}; 
        }
        case REMOVE_TODO: {
            const {todoId, containerId} = action.payload;
            const newTodos = [...state.todos];
            const tableroIndex = newTodos.findIndex(([tablero, container]) => tablero.id == state.tableroSelected);
            const containerIndex = newTodos[tableroIndex][1].findIndex(([containerData, todos]) => containerData.id == containerId);
            const todoIndex = newTodos[tableroIndex][1][containerIndex][1].findIndex(todoData => todoData.id == todoId);
            newTodos[tableroIndex][1][containerIndex][1].splice(todoIndex, 1);
            return {...state, todos: newTodos}; 
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
        case SET_CONTAINERS: {
            return {state, todos: action.payload}
        }
        case ADD_CONTAINER: {
            const {id, nombre} = action.payload;
            const newTodos = [...state.todos];
            const tableroIndex = newTodos.findIndex(([tablero, container]) => tablero.id == action.payload.id_tablero);
            newTodos[tableroIndex][1].push([{id: id, nombre: nombre}, []])
            return {...state, todos: newTodos}
        }
        case EDIT_CONTAINER: {
            const newTodos = [...state.todos];
            const indexTablero = newTodos.findIndex(([tablero, container]) => tablero.id == state.tableroSelected);
            const containers = newTodos[indexTablero][1];
            const containerIndex = containers.findIndex(container => container[0].id == action.payload.id);
            const containerToEdit = newTodos[indexTablero][1][containerIndex]
            const editedContainer = [{id: action.payload.id, nombre: action.payload.newName}, containerToEdit[1]];
            console.log('containerIndex', containerIndex);
            if(containerIndex >= 0){
                console.log('containerIndex', containerIndex);
                newTodos[indexTablero][1][containerIndex] = editedContainer;
                return {...state, todos: newTodos};
            }
        }
        case REMOVE_CONTAINER: {
            const containerIndex = state.todos.findIndex(container => container[0] == action.payload);
            const newTodos = [...state.todos];
            newTodos.splice(containerIndex, 1);
            return {...state, todos: newTodos};
        }
        case SET_TABLEROS: {
            return {...state, todos: action.payload}
        }
        case ADD_TABLERO: {
            return {...state, todos: [...state.todos, [action.payload, [['POR HACER', []], ['EN PROCESO', []], ['FINALIZADAS', []]]]]}
        }
        case EDIT_TABLERO: {
            const newTodos = [...state.todos];
            const tableroIndex = newTodos.findIndex(tablero => tablero[0].id == action.payload.id);
            if(tableroIndex != -1){
                newTodos[tableroIndex][0].nombre = action.payload.newName;
                return {...state, todos: newTodos};
            }
        }
        case REMOVE_TABLERO: {
            const tableroIndex = state.todos.findIndex(tablero => tablero[0].id == action.payload);
            const newTodos = [...state.todos];
            newTodos.splice(tableroIndex, 1);
            return {...state, todos: newTodos};
        }
        case ALTER_CONTAINER_POSITION: {
            const newTodos = [...state.todos];
            const indexTablero = newTodos.findIndex(([tablero, container]) => tablero.id == state.tableroSelected);
            const oldContainerIndex = newTodos[indexTablero][1].findIndex(([container, todos]) => container.id == action.payload.container.id);
            const container = newTodos[indexTablero][1].splice(oldContainerIndex, 1)[0];
            newTodos[indexTablero][1].splice(action.payload.newIndex, 0, container);
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
            // console.log(oldTodoIndex);
            // console.log(action.payload.newIndex);
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
        case SET_ACTIVE_TABLERO:
            return {...state, tableroSelected: action.payload}
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