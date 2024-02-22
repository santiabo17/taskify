import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, manageTodoForm } from "../actions";
import { CloseIcon } from "./CloseIcon";
import { PlusIcon } from "./PlusIcon";

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
    const tagsKeys = Object.keys(tagsOptions); 
    const tagsData = Object.keys(tagsOptions).map(tag => [tagsOptions[tag].value, tagsOptions[tag].color]);

    const handleEditTodo = () => {
        console.log("editing todo");
        console.log(task, tags, time);
        dispatch(editTodo({newTodo: {id: todo.id, todo: task, tags: tags, time: time}, container: container}));
    };

    const handleAddTag = (newTag) => {
      setTags(tags => [...tags, newTag]);
    }

    const handleRemoveTag = (removedTag) => {
      const tagIndex = tags.findIndex(tag => tag == removedTag);
      const newTags = [...tags];
      newTags.splice(tagIndex, 1);
      setTags(newTags);
    }


    return (
        <form ref={formRef} className='bg-slate-900/95 w-2/6 p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap'>
        <h2 className='mb-3 text-white text-2xl w-full'>EDITING TODO</h2>
        <input className='p-1 border-black border-2 w-full mb-3' type="text" placeholder='todo' onChange={(e) => setTask(e.target.value)} value={task}/>
        <div className='flex flex-wrap w-full gap-2 mb-6 '>
          {tagsData.map((tag, key) => (
            <div className={`flex items-center h-7 box-content ${tags.includes(tagsKeys[key]) && 'border-[3px] border-white'}`}>
              <span style={{backgroundColor: tag[1]}} className='w-max px-2 h-full text-white font-medium'>{tag[0]}</span>
              <span className="cursor-pointer h-full w-7">{tags.includes(tagsKeys[key]) ? 
                <CloseIcon 
                  className='bg-red-800 text-white w-full h-full flex items-center justify-center'
                  onClick={() => handleRemoveTag(tagsKeys[key])}
                /> : 
                <PlusIcon 
                  className='bg-blue-800 text-white w-full h-full flex items-center justify-center' 
                  onClick={() => handleAddTag(tagsKeys[key])}
                />}
              </span>
            </div>
          ))}
        </div>
        <input className='p-1 w-1/2' type="date" value={time} onChange={(e) => {setTime(e.target.value); handleEditTodo()}}/>
      </form>
    )
}

export {TodoEditCard}