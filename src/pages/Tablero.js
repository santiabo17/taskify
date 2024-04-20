import { useDispatch, useSelector } from 'react-redux';
import { addContainer, getDBData, setActiveContainer, setActiveTablero, setActiveTodo, setContainers, setDarkMode } from '../actions';
import React from 'react';
import { TodosContainer } from '../Components/TodosContainer';
import { TodoEditCard } from '../Components/TodoEditCard';
import { ContainersParent } from '../Components/ContainersParent';
import { DarkModeButton } from '../Components/DarkModeButton';
import { useNavigate, useParams } from 'react-router-dom';
import { BackArrowIcon } from '../Components/Icons/BackArrowIcon';
import { getAlllUsersData } from '../DB/getAllUsersData';
import { SET_ACTIVE_TABLERO } from '../actions/types';


function Tablero() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpenTodoForm = useSelector(state => state.todoCardForm);
  const darkMode = useSelector(state => state.darkMode);
  const { userid, tableroid } = useParams();
  const [tablero, setTablero] = React.useState(null);
  const todosData = useSelector(state => state.todos);

  React.useEffect(() => {
    const fetchData = async () => {
        const allData = await getAlllUsersData(userid);
        console.log('allData', allData);
        dispatch(getDBData(userid));
    };
    fetchData();
  }, [userid]);

  React.useEffect(() => {
      
      console.log('todosData', todosData);
      if(todosData.length > 0){
        const tableroInfo = todosData.find((tablero) => tablero[0].id == tableroid);
        console.log(tableroInfo);
        setTablero(tableroInfo[0]);
      }
      dispatch(setActiveTablero(tableroid));
  }, [tableroid, todosData]);

//   React.useEffect(() => {
//     console.log('todosData', todosData);
//       const tableroInfo = todosData.find((tablero) => tablero[0].id == tableroid);
//       console.log(tableroInfo);
//       setTablero(tableroInfo[0]);
// }, [tableroid, todosData]);

  return (
    <div 
      className={`App ${darkMode ? 'bg-slate-800' : ' bg-slate-200'} box-border w-screen min-w-max min-h-screen font-mono`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        dispatch(setActiveContainer(null)); 
        dispatch(setActiveTodo(null));
      }}
    >
      <BackArrowIcon className='absolute top-6 left-6 w-10 h-10 text-white cursor-pointer z-10' strokeWidth={2.5} 
      onClick={() => navigate(`/${userid}`)}/>
      <div className='sticky left-0 w-screen mb-5'>
        <h1 className={`text-[100px] w-full text-center leading-lose text-white ${darkMode ? 'text-white' : 'text-white drop-shadow-lg'}`}>TRELLO</h1>
        <h3 className='text-center'>Tablero: {tablero?.nombre}</h3>
        <DarkModeButton 
        className='absolute top-0 right-10  w-10 h-10 cursor-pointer mt-5'
        onClick={() => {dispatch(setDarkMode(!darkMode)); console.log(darkMode)}}
        />
      </div>
      <ContainersParent tableroid={tableroid}/>
      {isOpenTodoForm && <TodoEditCard/>}
    </div>
  );
}

export default Tablero;
