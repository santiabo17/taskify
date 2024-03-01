import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmptyTodo, editTodo, manageTodoForm, removeTodo, setActiveContainer, setActiveTodo, setDragContainer } from "../actions";
import { CloseIcon } from "./CloseIcon";
import { EditIcon } from "./EditIcon";
import { orderDateValue } from "../utils";
import { CalendarIcon } from "./CalendarIcon";

function TodoCard({todo, container}){
    const [editTask, setEditTask] = React.useState(todo.todo.length == 0);
    const [task, setTask] = React.useState(todo.todo);
    const [tags, setTags] = React.useState(todo.tags);
    const [time, setTime] = React.useState(todo.time);

    React.useEffect(()=> {
        setTask(todo.todo);
        setTags(todo.tags);
        setTime(todo.time);
    }, [todo]);

    

    const todoSelectedCard = React.useRef();
    // const todoGhostCard = useRef();

    const dispatch = useDispatch();
    const tagsData = useSelector(state => state.tags);
    const tagsValues = useSelector(state => state.tags).filter((tag, key) => tags.includes(key));
    const isOpenTodoForm = useSelector(state => state.todoCardForm);
    const todoSelected = useSelector(state => state.todoSelected);
    
    React.useEffect(() => {
        const ghostImage = document.querySelector(".ghost_image");
        if(!todoSelected && ghostImage){
            console.log('borrando');
            document.body.removeChild(ghostImage);
        }
    }, [todoSelected])

    const handleSetTodo = () => {
            dispatch(editTodo({newTodo: {id: todo.id, todo: task, tags: tags, time: time}, container: container}));
            setTask(todo.todo);
    }

    const handleRemoveTodo = () => {
        dispatch(removeTodo({todoId: todo.id, container: container}));
    }

    const handleOpenEditCard = () => {
        dispatch(manageTodoForm(!isOpenTodoForm));
        dispatch(setActiveTodo({...todo, container: container}));
    }

    return (
        <>
            {todo.id == todoSelected?.id && !isOpenTodoForm ?
                <div 
                    className="relative bg-indigo-500/30 mb-2 h-[70px] w-11/12 mx-auto "
                ></div> :
                <div ref={todoSelectedCard} className={`relative bg-indigo-900/30 mb-2 text-start p-4 pl-7 w-11/12 mx-auto flex flex-col gap-3 cursor-grab active:cursor-grabbing`}
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
                    <CloseIcon className="bg-blue-950 shadow-lg shadow-black/50 absolute w-7 h-7 text-xl font-bold text-white cursor-pointer -top-3 -left-1.5 flex items-center justify-center"
                    onClick={handleRemoveTodo}
                    />
                    <EditIcon className="bg-blue-950 shadow-lg shadow-black/50 absolute w-7 h-7 text-xl font-bold text-white cursor-pointer -top-3 -right-1.5 flex items-center justify-center"
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
                    <div className="flex items-end justify-between">
                        {time &&     
                            <div className="w-1/2 flex items-center justify-between">
                                <CalendarIcon/>
                                <h2 className=" font-bold">{orderDateValue(time)}</h2>
                            </div>    
                        }
                        {tagsValues.length > 0 &&
                            <div className="flex flex-col flex-wrap w-1/3 gap-2">
                                {tagsValues.map((tag) => <div style={{backgroundColor: tag.color}} className='text-right pl-8'>
                                        <span className="block bg-blue-900 font-bold min-w-12 text-[10px] p-0.5 pl-2">{tag.value}</span>
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