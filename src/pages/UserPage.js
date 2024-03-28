import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodosTablero } from "../Components/TodosTablero";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { getDBData, setContainers } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { getAlllUsersData } from "../DB/getAllUsersData";

function UserPage(){
    const { userid } = useParams();
    const tableros = useSelector(data => data.todos);
    console.log(tableros);
    const [userData, setUserData] = React.useState(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        fetch(`http://localhost:3500/users/${userid}`)
        .then(data => data.json())
        .then(data => setUserData(data));
        const fetchData = async () => {
            const allData = await getAlllUsersData(userid);
            console.log(allData);
            dispatch(getDBData(userid));
        };
        fetchData();
    }, [userid]);

    // console.log(userData);
    // console.log(tableros);
    
    return (
        <div>
            <h1 className="text-5xl text-center mb-10">{userData?.NOMBRE_USUARIO}</h1>
            <h1 className="text-3xl text-center mb-5">TUS TABLEROS</h1>
            <div className="flex gap-10 bg-slate-700 w-3/4 m-auto">
                {tableros.map(tablero => <TodosTablero tablero={tablero[0]} userid={userid}/>)}
                {/* <div onClick={() => setTableros([...tableros, []])} className="w-56 bg-gray-600 flex items-center">
                    <h3 className="text-center w-full">ADD TABLERO</h3>
                </div> */}
            </div>
            
        </div>
    )
}

export {UserPage}