import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmptyTodo, editTodo, manageTodoForm, removeTodo, setActiveContainer, setActiveTodo, setDragContainer } from "../actions";
import { CloseIcon } from "./Icons/CloseIcon";
import { EditIcon } from "./Icons/EditIcon";
import { orderDateValue } from "../utils";
import { CalendarIcon } from "./Icons/CalendarIcon";

function TodoCard({todo, container}){
    // console.log('smthng');
    // console.log('todo', todo);
    const [editTask, setEditTask] = React.useState(todo.tarea.length == 0);
    const [task, setTask] = React.useState(todo.tarea);
    // const [tags, setTags] = React.useState(todo.tags);
    const [tags, setTags] = React.useState([]);
    const [time, setTime] = React.useState(todo.fecha);

    React.useEffect(()=> {
        setTask(todo.tarea);
        // setTags(todo.tags);
        setTags([]);
        setTime(todo.fecha);
    }, [todo]);

    const todoSelectedCard = React.useRef();

    const dispatch = useDispatch();
    const tagsData = useSelector(state => state.tags);
    // const tagsValues = useSelector(state => state.tags).filter((tag, key) => tags.includes(key));
    const tagsValues = []
    const isOpenTodoForm = useSelector(state => state.todoCardForm);
    const todoSelected = useSelector(state => state.todoSelected);
    const darkMode = useSelector(state => state.darkMode);
    
    React.useEffect(() => {
        const ghostImage = document.querySelector(".ghost_image");
        if(!todoSelected && ghostImage){
            console.log('borrando');
            document.body.removeChild(ghostImage);
        }
    }, [todoSelected])

    const handleSetTodo = () => {
            dispatch(editTodo({todo: {id: todo.id_todo, tarea: task, tags: tags, fecha: time}, container: container}));
            setTask(todo.todo);
    }

    const handleRemoveTodo = () => {
        dispatch(removeTodo({todoId: todo.id, containerId: container.id}));
    }

    const handleOpenEditCard = () => {
        dispatch(manageTodoForm(!isOpenTodoForm));
        dispatch(setActiveTodo({...todo, container: container}));
    }

    return (
        <>
            {todo.id_todo == todoSelected?.id && !isOpenTodoForm ?
                <div 
                    className={`relative mb-2 h-[50px] w-11/12 mx-auto ${darkMode ? 'bg-indigo-500/30' : 'bg-slate-900/60'}`}
                ></div> :
                <div ref={todoSelectedCard} className={`relative ${darkMode ? 'bg-indigo-900/30' : 'bg-zinc-900/10'} mb-2 text-start p-3 pl-8 w-11/12 mx-auto flex flex-col cursor-grab shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] active:cursor-grabbing`}
                draggable={true} 
                onDragStart={(e) => {
                    console.log('pasado de datos');
                    const ghostItem = todoSelectedCard.current.cloneNode(true);
                    ghostItem.style.position = 'absolute';
                    ghostItem.style.top = '0px';
                    ghostItem.style.zIndex = "-10";
                    ghostItem.style.width = '300px';
                    ghostItem.style.opacity = '1';
                    ghostItem.classList.add('bg-indigo-900')
                    ghostItem.classList.add('ghost_image');
                    // ghostItem.style.backgroundColor = "blue";
                    // todoGhostCard.current = ghostItem;
                    document.body.appendChild(ghostItem);
                    e.dataTransfer.setDragImage(ghostItem, 50, 0);
                    dispatch(setActiveTodo({...todo, container: container}));
                    dispatch(setActiveContainer(null));
                }
              }
                onDragEnter={(e) => e.preventDefault()}
                onDragOver={() => dispatch(setDragContainer(container))}
                >
                    <CloseIcon className={`${darkMode ? 'bg-indigo-950' : 'bg-slate-500/80'}
                    shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] absolute w-7 h-7 text-xl font-bold text-white cursor-pointer -top-3 -left-1.5 flex items-center justify-center`}
                    onClick={handleRemoveTodo}
                    />
                    <EditIcon className={`${darkMode ? 'bg-indigo-950' : 'bg-slate-500/80'} 
                    shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]
                    absolute w-7 h-7 text-xl font-bold text-white cursor-pointer -top-3 -right-1.5 flex items-center justify-center`}
                    onClick={handleOpenEditCard}
                    />
                    <input type="text" 
                    className="w-3/4 text-xl bg-transparent border-0 focus:outline-0"
                    autoFocus={editTask}
                    onChange={(e) => setTask(e.target.value)}
                    onClick={(e) => {setEditTask(true); e.stopPropagation();}}
                    onBlur={handleSetTodo} 
                    readOnly={!editTask}
                    value={task}
                    />
                    <div className="flex items-start justify-between mt-1">
                        {time &&     
                            <div className="w-1/2 flex items-center justify-between">
                                <CalendarIcon/>
                                <h2 className="font-bold">{orderDateValue(time)}</h2>
                            </div>    
                        }
                        {tagsValues.length > 0 &&
                            <div className="flex flex-col flex-wrap w-2/5 gap-2">
                                {tagsValues.map((tag) => <div style={{backgroundColor: tag.color}} className='text-right pl-8'>
                                        <span className="block bg-blue-900 font-bold text-[10px] pr-1">{tag.value}</span>
                                    </div>)}
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    
    )
}

export {TodoCard}