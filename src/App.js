import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContainer, setActiveContainer, setActiveTodo } from './actions';
import React from 'react';
import { TodosContainer } from './Components/TodosContainer';
import { TodoEditCard } from './Components/TodoEditCard';
import { ContainersParent } from './Components/ContainersParent';


function App() {
  const dispatch = useDispatch();
  const isOpenTodoForm = useSelector(state => state.todoCardForm);

  

  return (
    <div 
      className="App bg-slate-800 w-max min-h-screen"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        console.log('argggg');
        dispatch(setActiveContainer(null)); 
        dispatch(setActiveTodo(null));
      }}
    >
      <h1 className='text-[100px] text-white'>TRELLO</h1>
      <ContainersParent/>
      {isOpenTodoForm && <TodoEditCard/>}
    </div>
  );
}

export default App;
