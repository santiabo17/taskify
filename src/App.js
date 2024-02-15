import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContainer, setForm } from './actions';
import React from 'react';
import { TodoForm } from './Components/TodoForm';
import { TodoContainerForm } from './Components/ContainerForm';
import { TodoContainer } from './Components/TodoContainer';
import { EditableContainer } from './Components/EditableContainer';

function App() {
  const dispatch = useDispatch();
  const todosData = useSelector(state => state.todos);
  console.log(todosData);
  const todos = todosData.map(([_, todos]) => todos);
  const containers = todosData.map(([container, _]) => container);

  const handleAddNewContainer = () => {
    console.log('adding container');
    dispatch(addContainer(""));
  }

  return (
    <div className="App bg-black h-svh">
      <h1 className='text-[100px] text-white'>TRELLO</h1>
      <div className="columns_container flex bg-white/10 p-5 mx-10 gap-3 w-fit">
        {containers.map((container, key) => <EditableContainer key={container} containerName={container} todos={todos[key]}/>)}
        <button 
            className='bg-green-400 w-80 basis-80 h-20 py-3 mb-8 mr-2.5'
            onClick={handleAddNewContainer}
          >Create New Container</button>
      </div>
    </div>
  );
}

export default App;
