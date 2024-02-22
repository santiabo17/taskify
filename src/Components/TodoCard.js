import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, manageTodoForm, removeTodo, setActiveTodo } from "../actions";
import { CloseIcon } from "./CloseIcon";
import { EditIcon } from "./EditIcon";

function TodoCard({todo, container}){
    // console.log(todo);
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
    const tagsValues = Object.keys(tagsOptions).filter(tag => tags.includes(tag)).map(tag => [tagsOptions[tag].value, tagsOptions[tag].color]);
    const isOpenTodoForm = useSelector(state => state.todoCardForm);

    // console.log(tagsValues);

    const handleSetTodo = () => {
        if(task.length > 0){
            dispatch(editTodo({newTodo: {id: todo.id, todo: task, tags: tags, time: time}, container: container}));
        } else {
            dispatch(removeTodo({todoId: todo.id, container: container}))
        }
    }

    const handleRemoveTodo = () => {
        dispatch(removeTodo({todoId: todo.id, container: container}));
    }

    const handleOpenEditCard = () => {
        dispatch(manageTodoForm(!isOpenTodoForm));
        dispatch(setActiveTodo({...todo, container: container}));
    }

    return (
       <div className='relative bg-indigo-900/30 mb-2 text-start p-4 w-11/12 mx-auto flex flex-col gap-3 cursor-grab active:cursor-grabbing' 
        draggable={true} 
        onDragStart={(e) => {
            e.stopPropagation();
            console.log('pasado de datos')
            console.log(container);
            dispatch(setActiveTodo({...todo, container: container}));
        }}
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
            <div className="flex items-end justify-between">
                {time &&           
                    <h2 className="w-1/2 bg-blue-900">{time}</h2>
                }
                {tagsValues.length > 0 &&
                    <div className="flex flex-col flex-wrap w-1/3 gap-2">
                        {tagsValues.map(tag => <div style={{backgroundColor: tag[1]}} className='text-right pl-8'>
                                <span className="block bg-blue-900 font-bold min-w-12 text-[10px] p-0.5 pl-2">{tag[0]}</span>
                            </div>)}
                    </div>
                }
            </div>
           
        </div> 
    )
}

export {TodoCard}