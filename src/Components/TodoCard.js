import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, manageTodoForm, removeTodo, setActiveTodo } from "../actions";
import { CloseIcon } from "./CloseIcon";
import { EditIcon } from "./EditIcon";

function TodoCard({todo, container}){
    console.log(todo);
    const [editTask, setEditTask] = React.useState(todo.todo.length == 0);

    const [task, setTask] = React.useState(todo.todo);
    const [tags, setTags] = React.useState(todo.tags);
    const [time, setTime] = React.useState(todo.time);

    React.useEffect(()=> {
        setTask(todo.todo);
        setTags(todo.tags);
        setTime(todo.time);
    }, [todo])

    const dispatch = useDispatch();
    const tagsOptions = useSelector(state => state.tags);
    const tagsValues = Object.keys(tagsOptions).map(tag => tagsOptions[tag].value);
    const isOpenTodoForm = useSelector(state => state.todoCardForm);

    const handleSetTodo = () => {
        if(task.length > 0){
            dispatch(editTodo({newTodo: {id: todo.id, todo: task, tags: tags, time: time}, container: container}));
        } else {
            dispatch(removeTodo({todoId: todo.id, container: container}))
        }
    }

    const handleRemoveTodo = () => {
        dispatch(removeTodo({todoId: todo.id, container: container}))
    }

    const handleOpenEditCard = () => {
        dispatch(manageTodoForm(!isOpenTodoForm));
        dispatch(setActiveTodo({...todo, container: container}));
    }

    return (
       <div className='relative bg-blue-950 mb-2 text-start p-4 w-11/12 mx-auto flex flex-col gap-3'
            // onClick={handleOpenEditCard}
       >
            <CloseIcon className="bg-blue-950 shadow-lg shadow-black/50 absolute w-7 h-7 text-xl font-bold text-white cursor-pointer -top-3 -left-1.5 flex items-center justify-center"
            onClick={handleRemoveTodo}
            />
            <EditIcon className="bg-blue-950 shadow-lg shadow-black/50 absolute w-7 h-7 text-xl font-bold text-white cursor-pointer -top-3 -right-1.5 flex items-center justify-center"
            onClick={handleOpenEditCard}
            />
            <div className="flex justify-between">
                <h2>Todo:</h2>
                <input type="text" 
                className="w-3/4 bg-transparent border-0 focus:outline-0"
                autoFocus={editTask}
                onChange={(e) => setTask(e.target.value)}
                onClick={(e) => {setEditTask(true); e.stopPropagation();}}
                onBlur={handleSetTodo} 
                readOnly={!editTask}
                value={task}
                />
            </div>
            <div className="flex justify-between">
                <h3>Status: </h3>
                <select name="status"
                className="w-3/4 bg-blue-950"
                onChange={(e) => setTags(e.target.value)}
                onBlur={handleSetTodo} 
                onClick={(e) => e.stopPropagation()}
                >
                    {tagsValues.map(opt => <option value={opt} selected={tags == opt}>{opt}</option>)}
                </select>
            </div>
            <div className="flex justify-between">
                <h3>Time: </h3>
                <input type="date" 
                className="w-3/4 bg-blue-950"
                onChange={(e) => setTime(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onBlur={handleSetTodo} 
                value={time}
                />
            </div>
        </div> 
    )
}

export {TodoCard}