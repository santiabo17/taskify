import { useNavigate } from "react-router-dom";

function TodosTablero({userid, tablero}) {
    const navigate = useNavigate();
    console.log('tablero', tablero);
    return (
        <div className="bg-gray-300 p-10 w-56" onClick={() => navigate(`/${userid}/${tablero.id}`)}><h1>Tablero</h1><h2>Nombre: {tablero.nombre}</h2></div>
    )
}

export {TodosTablero}