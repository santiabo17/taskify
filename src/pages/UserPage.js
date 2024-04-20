import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodosTablero } from "../Components/TodosTablero";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { addTablero, getDBData, setActiveTablero, setContainers, setUserid } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { getAlllUsersData } from "../DB/getAllUsersData";

function UserPage(){
    const { userid } = useParams();
    const tableros = useSelector(state => state.todos);
    const [userData, setUserData] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        dispatch(setUserid(userid));
        dispatch(setActiveTablero(null));

        fetch(`http://localhost:3500/users/${userid}`)
        .then(data => data.json())
        .then(data => setUserData(data));

        const fetchData = async () => {
            const allData = await getAlllUsersData(userid);
            console.log('allData', allData);
            dispatch(getDBData(userid));
        };
        fetchData();
    }, [userid]);

    const handleAddNewTablero = () => {
        dispatch(addTablero(""));
    }

    const closeSession = () => {
        localStorage.removeItem('trello_user');
        navigate('/login'); 
    }
    
    return (
        <div>
            <div className="absolute top-5 right-10 p-4" onClick={closeSession}>Cerrar sesión</div>
            <h1 className="text-5xl text-center mb-10">{userData?.NOMBRE_USUARIO}</h1>
            <h1 className="text-3xl text-center mb-5">TUS TABLEROS</h1>
            <div className="flex flex-wrap gap-10 bg-slate-700 w-3/4 m-auto">
                {tableros.length > 0 && tableros.map(tablero => <TodosTablero key={tablero[0].id} tablero={tablero[0]} userid={userid}/>)}
                <div onClick={handleAddNewTablero} className="w-56 p-6 bg-gray-600 flex items-center cursor-pointer">
                    <h3 className="text-center w-full font-bold text-white">ADD TABLERO</h3>
                </div>
            </div>
            
        </div>
    )
}

export {UserPage}