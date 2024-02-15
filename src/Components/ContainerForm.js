import React from "react";
import { useDispatch } from "react-redux";
import { addContainer, addTodo, setForm } from "../actions";

function TodoContainerForm({setOpenContainerForm}){
    const [newContainer, setNewContainer] = React.useState('');
    
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

    const handleAddContainer = () => {
        dispatch(addContainer(newContainer));
        dispatch(setForm('none'));
        setNewContainer('')
      };

    return (
        <form className='bg-red-700/50 w-fit p-5 absolute top-1/2 left-1/2'>
        <h2 className='mb-3'>NEW CONTAINER</h2>
        <input className='p-1 border-black border-2 w-full' type="text" placeholder='Container name' onChange={(e) => setNewContainer(e.target.value)} value={newContainer}/>
        <button className='bg-white p-2 mt-4 font-bold border-2 border-black' onClick={handleAddContainer}>
          AGREGAR CONTAINER
        </button>
      </form>
    )
}

export { TodoContainerForm }