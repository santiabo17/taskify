import React from "react";
import { useNavigate } from "react-router";

function Login (){
    const navigate = useNavigate();
    const [userName, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState(null);
    const handleLogin = (e) => {
        console.log(`trying login, user: ${userName} - password: ${password}`);
        fetch(`http://localhost:3500/users/${userName}/${password}`)
        .then(data => data.json())
        .then(data => {
            if(data.error){
                setMessage(data.error);
            } else {
                console.log(data);
                setMessage('logeo correcto');
                localStorage.setItem('trello_user', data.NOMBRE_USUARIO);
                navigate('/'+data.ID_USUARIO);
            }
        })
    }
    return(
        <div className=" h-screen w-screen flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl font-bold text-sky-950">LOGIN</h1>
            <div className="w-2/5 bg-blue-300/50 text-2xl p-5">
                <h3 className="mb-2 text-sky-950">Nombre de Usuario</h3>
                <input className="border-2 border-black w-full p-2 mb-2 text-xl text-sky-950" type="text" value={userName} onChange={(e) => setUsername(e.target.value)}/>
                <h3 className="mb-2 text-sky-950">Contrase�a</h3>
                <input className="border-2 border-black w-full p-2 mb-2 text-xl text-sky-950" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="w-full block p-2 text-white mt-5 bg-sky-950" onClick={handleLogin}>Login</button>
                {message && <h3 className="bg-red-500 text-lg text-white mt-5 p-2 text-center">{message}</h3>}
            </div>
        </div>
        
    )
}

export {Login}