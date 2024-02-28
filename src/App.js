import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContainer } from './actions';
import React from 'react';
import { TodosContainer } from './Components/TodosContainer';
import { TodoEditCard } from './Components/TodoEditCard';
import { ContainersParent } from './Components/ContainersParent';


function App() {
  const dispatch = useDispatch();
  const isOpenTodoForm = useSelector(state => state.todoCardForm);

  

  return (
    <div className="App bg-slate-800 w-max ">
      <h1 className='text-[100px] text-white'>TRELLO</h1>
      <ContainersParent/>
      {/* <div className="columns_container flex bg-white/10 p-5 mx-10 gap-3 w-fit">
        {containers.map((container, key) => <TodosContainer key={container} containerName={container} todos={todos[key]}/>)}
        <button 
            className='bg-green-400 w-80 basis-80 h-20 py-3 mb-8 mr-2.5'
            onClick={handleAddNewContainer}
          >Create New Container</button>
      </div> */}
      {isOpenTodoForm && <TodoEditCard/>}
    </div>
  );
}

export default App;
