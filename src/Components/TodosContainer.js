import React from "react";
import { addTodo, editContainer, removeContainer } from "../actions"
import { useDispatch, useSelector } from "react-redux";
import { TodoCard } from "./TodoCard";
import { v4 as uuidv4 } from 'uuid';

function TodosContainer({containerName, todos}){
    // console.log(containerName);
    const [edit, setEdit] = React.useState(containerName.length == 0);
    const [name, setName] = React.useState(containerName);
    
    const dispatch = useDispatch();
    const tags = useSelector(state => state.tags);

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
        dispatch(addTodo({todo: {id: uniqueId, todo: '', tag: tags.DEVELOPMENT, time: '2004-10-09'}, container: containerName}));
    }

    return (
        <div className="column h-[400px] overflow-y-scroll text-white bg-blue-900 w-80 basis-80">
            <input 
            className='text-xl font-bold mb-3 w-72 p-2 border-0 mt-3 bg-transparent focus: outline-0'
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
                className='bg-green-400 w-48 py-3 mb-8'
                onClick={handleAddTodo}
            >Create New Todo</button>
        </div>
    )
}

export {TodosContainer}