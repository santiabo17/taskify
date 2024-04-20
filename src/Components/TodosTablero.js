import React from "react";
import { useNavigate } from "react-router-dom";
import { editTablero, removeTablero } from "../actions";
import { useDispatch } from "react-redux";

function TodosTablero({userid, tablero}) {
    // console.log('tablero element', tablero);
    const [edit, setEdit] = React.useState(tablero.nombre.length == 0);
    const [name, setName] = React.useState(tablero.nombre);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const handleChangeTableroName = (newName) => {
        if(newName.length < 1){
            dispatch(removeTablero(tablero.id))
            // console.log('removing tablero')
        }
        if(tablero.nombre != newName){
            dispatch(editTablero({id: tablero.id, newName: newName}));
        }
    }

    return (
        <div className="bg-slate-400 px-2 py-10 w-56" onClick={() => navigate(`/${userid}/${tablero.id}`)}>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={edit}
                readOnly={!edit} 
                onBlur={(event) => {handleChangeTableroName(event.target.value)}} 
                onClick={(e) => {e.stopPropagation(); setEdit(true);}}
                className="bg-transparent uppercase font-bold w-full text-wrap duration-700 hover:bg-slate-500"
            />
        </div>
    )
}

export {TodosTablero}