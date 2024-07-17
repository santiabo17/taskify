import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContainer, setActiveContainer, setActiveTodo, setDarkMode } from './actions';
import React from 'react';
import { TodosContainer } from './Components/TodosContainer';
import { TodoEditCard } from './Components/TodoEditCard';
import { ContainersParent } from './Components/ContainersParent';
import { DarkModeButton } from './Components/DarkModeButton';
import { TodosFilter } from './Components/TodosFilter';
import { CustomSelect } from './Components/CustomSelect';


function App() {
  const dispatch = useDispatch();
  const isOpenTodoForm = useSelector(state => state.todoCardForm);
  const darkMode = useSelector(state => state.darkMode);
  console.log(darkMode);

  

  return (
    <div 
      className={`App ${darkMode ? 'bg-slate-800' : ' bg-slate-200'} box-border w-screen min-w-max min-h-screen font-mono`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        dispatch(setActiveContainer(null)); 
        dispatch(setActiveTodo(null));
      }}
    >
      <div className='sticky left-0 w-screen mb-5'>
        <TodosFilter/>
        <h1 className={`text-[100px] w-full text-center leading-lose text-white ${darkMode ? 'text-white' : 'text-white drop-shadow-lg'}`}>TASKIFY</h1>
        <DarkModeButton 
        className='absolute top-0 right-10 z-10  w-10 h-10 cursor-pointer mt-5'
        onClick={() => dispatch(setDarkMode(!darkMode))}
        />
      </div>
      <ContainersParent/>
      {isOpenTodoForm && <TodoEditCard/>}
    </div>
  );
}

export default App;
