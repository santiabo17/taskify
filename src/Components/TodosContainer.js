import React from "react";
import { addTodo, alterContainerPosition, alterTodoContainer, alterTodoPosition, editContainer, removeContainer, setActiveContainer, setActiveTodo } from "../actions"
import { useDispatch, useSelector } from "react-redux";
import { TodoCard } from "./TodoCard";
import { v4 as uuidv4 } from 'uuid';

function TodosContainer({containerName, todos, dragging}){
    // console.log(containerName, todos);
    // console.log(containerName);
    const [edit, setEdit] = React.useState(containerName.length == 0);
    const [name, setName] = React.useState(containerName);

    const container = React.useRef();

    const dispatch = useDispatch();
    const tags = useSelector(state => state.tags);
    const todoSelected = useSelector(state => state.todoSelected);


    React.useEffect(() => {
        setName(containerName);
    }, [containerName]);

    const handleChangeContainerName = (newName) => {
        if(newName.length < 1){
            dispatch(removeContainer(""))
        }
        if(containerName != newName){
            dispatch(editContainer({oldName: containerName, newName: newName}));
        }
    }

    const handleAddTodo = () => {
        const uniqueId = uuidv4();
        dispatch(addTodo({todo: {id: uniqueId, todo: '', tags: [], time: null}, container: containerName}));
    }

    const handleChangeTodoContainer = (e) => {
        console.log("arrastrando propagation");
        console.log(todoSelected);
        if(todoSelected != null){
            const containerTop = container.current.getBoundingClientRect().top + 45;
            const elementY = e.clientY;
            // console.log('containerTop', containerTop, 'elementY', elementY);
            const position = elementY - containerTop;
            const todoIndex = Math.round(position/130);
            // console.log('position', position);
            const originalIndex = todos.findIndex(todo => todo.id == todoSelected.id);
            console.log('todoCOntainer', todoSelected.container);
            console.log('containerName', name);
            if(todoSelected.container != name){
                console.log('changing container')
                dispatch(alterTodoContainer({todo: todoSelected, containers: {old:todoSelected.container, new: name}}))
            }
            console.log('originalIndex', originalIndex);
            console.log('newIndex', todoIndex);
            if(todoIndex != originalIndex){
                console.log('changing position');
                dispatch(alterTodoPosition({todo: todoSelected, container: name, newIndex: todoIndex}));
            }
        }
    }
             

    return (
        <div draggable={true} className="column min-h-[400px] text-white bg-slate-900 w-80 basis-80 cursor-grab active:cursor-grabbing"
        onDragEnter={handleChangeTodoContainer} 
        onDragOver={e => e.preventDefault()}
        onDragStart={(e) => {
            dispatch(setActiveContainer(containerName));
            dispatch(setActiveTodo(null));
            // e.stopPropagation();
            // e.preventDefault();
            // console.log(e);
            // dispatch(alterContainerPosition({newIndex: 0, container: containerName}));
        }}
        ref={container}
        // onDrop={handleChangeTodoContainer}
        >
            <input 
            className='text-xl font-bold mt-4 mb-6 w-72 px-2 border-0 bg-transparent focus: outline-0'
            value={name} 
            autoFocus={edit}
            onChange={(e) => setName(e.target.value)}
            readOnly={!edit} 
            onBlur={(event) => {handleChangeContainerName(event.target.value)}} 
            onClick={() => {setEdit(true)}}/>
            {todos.map((todo, key) => (
                <TodoCard todo={todo} container={containerName} key={key}/>
            ))}
            <button 
                className='b bg-slate-950 w-48 py-3 mb-8'
                onClick={handleAddTodo}
            >Create New Todo</button>
        </div>
    )
}

export {TodosContainer}