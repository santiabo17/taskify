import React from "react";
import { addEmptyTodo, addTodo, alterContainerPosition, alterTodoContainer, alterTodoPosition, editContainer, removeContainer, removeEmptyTodo, removeTodo, setActiveContainer, setActiveTodo, setDragContainer } from "../actions"
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
    const containerSelected = useSelector(state => state.containerSelected);
    const todoSelected = useSelector(state => state.todoSelected);
    const darkMode = useSelector(state => state.darkMode);

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

    const handleChangingTodoContainer = (e) => {
        if(todoSelected != null){
            // console.log(todoSelected.container);
            const containerTop = container.current.getBoundingClientRect().top + 45;
            const elementY = e.clientY;
            const position = elementY - containerTop;
            const todoIndex = Math.round(position/60);
            const originalIndex = todos.findIndex(todo => todo.id == todoSelected.id);
            if(todoSelected.container != name){
                console.log('changing container')
                dispatch(alterTodoContainer({todo: {...todoSelected}, containers: {old: todoSelected.container, new: name}}));
                dispatch(setActiveTodo({...todoSelected, container: name}));
            }
            if(todoIndex != originalIndex){
                dispatch(alterTodoPosition({todo: {...todoSelected}, container: name, newIndex: todoIndex}));
            }
        }
    }

    const handleChangeTodoContainer = (e) => {
        if(todoSelected != null){
            const containerTop = container.current.getBoundingClientRect().top + 45;
            const elementY = e.clientY;
            const position = elementY - containerTop;
            const todoIndex = Math.round(position/50);
            const originalIndex = todos.findIndex(todo => todo.id == todoSelected.id);
            dispatch(removeEmptyTodo({container: name}));
            dispatch(addTodo({todo: todoSelected, container: name}));
            if(todoIndex != originalIndex){
                dispatch(alterTodoPosition({todo: todoSelected, container: name, newIndex: todoIndex}));
            }
        }
    }

    // React.useEffect(() => {
    //     const emptyTodo = {todo: {status: 'empty'}, container: name}
    //     if(dragContainer != containerName){
    //         dispatch(removeEmptyTodo(emptyTodo));
    //     } else {
    //         dispatch(addEmptyTodo(emptyTodo));
    //     }
    // }, [dragContainer])
             

    return (
        <>
            {containerName == containerSelected ?
                <div className="column min-h-[400px] text-white bg-slate-700/70 w-80 basis-80"></div> :
                <div draggable={true} className={`column min-h-[400px] text-white ${darkMode ? 'bg-slate-900' : 'bg-slate-400'} w-80 basis-80 cursor-grab active:cursor-grabbing`}
                onDragLeave={handleChangingTodoContainer}
                onDragOver={e => {e.preventDefault(); e.stopPropagation(); handleChangingTodoContainer(e)}}
                onDragStart={(e) => {
                    console.log(e.target);
                    console.log(container.current);
                    if(e.target == container.current){
                        console.log("dragging container start");
                        console.log('pasado de datos');
                        const ghostContainer = container.current.cloneNode(true);
                        ghostContainer.style.position = 'absolute';
                        ghostContainer.style.top = '0px';
                        ghostContainer.style.zIndex = "-10";
                        ghostContainer.style.width = '320px';
                        ghostContainer.style.opacity = '1';
                        ghostContainer.classList.add('bg-slate-900')
                        ghostContainer.classList.add('ghost_container');
                        document.body.appendChild(ghostContainer);
                        e.dataTransfer.setDragImage(ghostContainer, 50, 0);
                        dispatch(setActiveContainer(containerName)); 
                        dispatch(setActiveTodo(null));
                    }
                }}
                // onDrop={handleChangeTodoContainer}
                onDrop={() => dispatch(setActiveTodo(null))}
                ref={container}
                
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
                        todo.id ? 
                        <TodoCard todo={todo} container={containerName} key={key}/> : 
                        <div className='relative mb-2 w-11/12 mx-auto h-16 bg-blue-500'></div>
                    )   
                    )}
                    <button 
                        className={`${darkMode ? 'bg-slate-950' : 'bg-slate-950/60'}  w-48 py-3 mb-8`}
                        onClick={handleAddTodo}
                    >Create New Todo</button>
                </div>
            }
        </>
       
    )
}

export {TodosContainer}