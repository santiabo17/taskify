import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editContainer, editTodo, removeTodo } from "../actions";

function TodoCard({todo, container}){
    console.log('rendering card', todo.todo);
    const [editTask, setEditTask] = React.useState(todo.todo.length == 0);
    // const [editStatus, setEditStatus] = React.useState(false);
    // const [editTime, setEditTime] = React.useState(false);

    const [task, setTask] = React.useState(todo.todo);
    const [status, setStatus] = React.useState(todo.status);
    const [time, setTime] = React.useState(todo.time);

    React.useEffect(()=> {
        setTask(todo.todo);
    }, [todo])

    const dispatch = useDispatch();
    const statusOptions = useSelector(state => state.status);

    const handleSetTodo = () => {
        if(task.length > 0){
            dispatch(editTodo({oldTodo: todo, newTodo: {todo: task, status: status, time: time}, container: container}));
        } else {
            dispatch(removeTodo({todo: {todo: task, status: status, time: time}, container: container}))
        }
    }

    const handleRemoveTodo = () => {
        dispatch(removeTodo({todo: {todo: task, status: status, time: time}, container: container}))
    }

    return (
       <div className='relative bg-blue-950 mb-2 text-start p-4 w-11/12 mx-auto flex flex-col gap-3'>
            <h3 
            className="absolute text-xl font-bold text-white cursor-pointer -top-3 -left-1"
            onClick={handleRemoveTodo}
            >X</h3>
            <div className="flex justify-between">
                <h2>Todo:</h2>
                <input type="text" 
                className="w-3/4 bg-transparent border-0 focus:outline-0"
                autoFocus={editTask}
                onChange={(e) => setTask(e.target.value)}
                onClick={() => setEditTask(true)}
                onBlur={handleSetTodo} 
                readOnly={!editTask}
                value={task}
                />
            </div>
            <div className="flex justify-between">
                <h3>Status: </h3>
                <select name="status"
                className="w-3/4 bg-blue-950"
                onChange={(e) => setStatus(e.target.value)}
                onBlur={handleSetTodo} 
                >
                    {statusOptions.map(opt => <option value={opt} selected={status == opt}>{opt}</option>)}
                </select>
            </div>
            <div className="flex justify-between">
                <h3>Time: </h3>
                <input type="date" 
                className="w-3/4 bg-blue-950"
                onChange={(e) => setTime(e.target.value)}
                onBlur={handleSetTodo} 
                value={time}
                />
            </div>
        </div> 
    )
}

export {TodoCard}