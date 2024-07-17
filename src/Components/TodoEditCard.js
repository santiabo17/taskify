import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, manageTodoForm, setActiveTodo } from "../actions";
import { CloseIcon } from "./CloseIcon";
import { PlusIcon } from "./PlusIcon";
import { EditIcon } from "./EditIcon";
import { TagsSelector } from "./TagsSelector";
import './style.css'

function TodoEditCard(){
    const formRef = React.useRef();
    const todo = useSelector(state => state.todoSelected);
    const container = todo.container;
    const [task, setTask] = React.useState(todo.todo);
    const [tags, setTags] = React.useState(todo.tags);
    const [time, setTime] = React.useState(todo.time);

    React.useEffect(() => {
      function handleClickOutside(event) {
        if (formRef.current && !formRef.current.contains(event.target)) {
          dispatch(manageTodoForm(false));
          dispatch(setActiveTodo(null));
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    React.useEffect(() => {
        handleEditTodo();
    }, [task, tags, time])
    
    const dispatch = useDispatch();
    

    const handleEditTodo = () => {
        console.log("editing todo");
        console.log(task, tags, time);
        dispatch(editTodo({newTodo: {id: todo.id, todo: task, tags: tags, time: time}, container: container}));
    };




    return (
        <form ref={formRef} className='bg-slate-900/95 w-2/6 p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-between'>
        <h2 className='mb-3 text-white text-2xl w-full'>EDITING TASK</h2>
        <input className='p-1 border-black border-2 w-full mb-3' type="text" placeholder='todo' onChange={(e) => setTask(e.target.value)} value={task}/>
        <input className='p-1 w-1/3 h-8 bg-black text-white font-mono date_picker' type="date" value={time} onChange={(e) => {setTime(e.target.value); handleEditTodo()}}/>
        <TagsSelector tags={tags} setTags={setTags}/>
      </form>
    )
}

export {TodoEditCard}