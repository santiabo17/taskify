import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, manageTodoForm } from "../actions";

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
    const tagsOptions = useSelector(state => state.tags);
    const tagsValues = Object.keys(tagsOptions).map(tag => tagsOptions[tag].value);

    const handleEditTodo = () => {
        console.log("editing todo");
        console.log(task, tags, time);
        dispatch(editTodo({newTodo: {id: todo.id, todo: task, tags: tags, time: time}, container: container}));
    };

    return (
        <form ref={formRef} className='bg-slate-900/95 w-2/6 p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap'>
        <h2 className='mb-3 text-white text-2xl w-full'>EDITING TODO</h2>
        <input className='p-1 border-black border-2 w-full mb-3' type="text" placeholder='todo' onChange={(e) => setTask(e.target.value)} value={task}/>
        <div className="flex gap-3 w-full justify-between">
            <select name="status"
                    className="p-1 w-1/2 after:rounded-none"
                    onChange={(e) => setTags(e.target.value)}
            >
                {tagsValues.map(opt => <option value={opt} selected={tags == opt}>{opt}</option>)}
            </select>
            <input className='p-1 w-1/2' type="date" value={time} onChange={(e) => {setTime(e.target.value); handleEditTodo()}}/>
        </div>
      </form>
    )
}

export {TodoEditCard}