import React from "react";
import { useDispatch } from "react-redux";
import { addTodo, setForm } from "../actions";

function TodoForm({setOpenTodoForm}){
    const [newTodo, setNewTodo] = React.useState('');
    const [todoTime, setTodoTime] = React.useState(null);
    
    const formRef = React.useRef();

    React.useEffect(() => {
      function handleClickOutside(event) {
        if (formRef.current && !formRef.current.contains(event.target)) {
          dispatch(setForm('none'));
          console.log(event.target);
          console.log(formRef.current);
          console.log("borrando")
        }
      }
  
      // Add event listener when the component mounts
      document.addEventListener('mousedown', handleClickOutside);
  
      // Remove event listener when the component unmounts
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    
    const dispatch = useDispatch();

    const handleAddTodo = () => {
      dispatch(addTodo({todo: {content: newTodo, status: 'done', time: todoTime}, container: 'POR HACER'}));
      dispatch(setForm('none'));
      setNewTodo('');
    };

    return (
        <form ref={formRef} className='bg-red-700/50 w-fit p-5 absolute top-1/2 left-1/2'>
        <h2 className='mb-3'>NEW TODO</h2>
        <input className='p-1 border-black border-2 w-full' type="text" placeholder='todo' onChange={(e) => setNewTodo(e.target.value)} value={newTodo}/>
        <input className='w-full' type="date" onChange={(e) => setTodoTime(e.target.value)}/>
        <button className='bg-white p-2 mt-4 font-bold border-2 border-black' onClick={handleAddTodo}>
          AGREGAR TODO
        </button>
      </form>
    )
}

export { TodoForm }