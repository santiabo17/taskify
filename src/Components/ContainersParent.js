import { useDispatch, useSelector } from "react-redux";
import { TodosContainer } from "./TodosContainer";
import { addContainer, alterContainerPosition, setActiveContainer, setActiveTodo } from "../actions";
import React from "react";

function ContainersParent({tableroid}){
    const todosData = useSelector(state => state.todos);
    console.log(todosData);
    // const containers = [];
    const containers = todosData.length > 0 ? todosData.find(([tablero, containers]) => tablero.id == tableroid)[1] : [];
    const todos = containers.map(container => container[1]);

    // console.log(todosData);
    // console.log(containers);
    // console.log(todos);
    
    const selectedContainer = useSelector(state => state.containerSelected);
    const darkMode = useSelector(state => state.darkMode);
    
    const dispatch = useDispatch();

    const container = React.useRef();

    const handleAddNewContainer = () => {
        dispatch(addContainer({id_tablero: tableroid, nombre:""}));
    }

    const handleChangeContainerPosition = (e) => {
        if(selectedContainer != null){
            console.log(selectedContainer);
            const containerLeft = container.current.getBoundingClientRect().left;
            const elementX = e.clientX;
            // console.log('containerLeft', containerLeft, 'elementX', elementX);
            const position = elementX - containerLeft;
            // console.log('position', position);
            const containerIndex = Math.round(position/500);
            console.log('containerIndex', containerIndex);
            dispatch(alterContainerPosition({id_tablero: tableroid, newIndex: containerIndex, container: selectedContainer}));
        }
    }

    return (
        <div 
        className={`columns_container flex ${darkMode ? 'bg-white/5' : 'bg-black/10'} p-5 mx-10 gap-3 w-fit`}
        ref={container}
        // onDragEnter={handleChangeContainerPosition} 
        onDragOver={e => {e.preventDefault(); handleChangeContainerPosition(e);}}
        onDrop={() => {
            dispatch(setActiveContainer(null)); 
            dispatch(setActiveTodo(null));
        }}
        // onDragStart={(e) => {e.preventDefault();}}
        >
            {containers.map((container, key) => <TodosContainer key={container[0].id} containerData={container[0]} todos={todos[key]}/>)}
            <button 
                className={`${darkMode ? 'bg-slate-950' : 'bg-slate-950/70'}  text-white w-80 basis-80 h-20 py-3 mb-8 mr-2.5`}
                onClick={handleAddNewContainer}
            >Create New Container</button>
        </div>
    )
        
}

export {ContainersParent}