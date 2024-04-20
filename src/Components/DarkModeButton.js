import { useSelector } from "react-redux"
import { SunIcon } from "./Icons/SunIcon";
import { MoonIcon } from "./Icons/MoonIcon";

function DarkModeButton({className, onClick}){
    const darkMode = useSelector(state => state.darkMode);
    return (darkMode ?  <SunIcon className={className + ' text-white'} onClick={onClick}/> : <MoonIcon className={className + ' text-slate-800'} onClick={onClick}/>)
}

export { DarkModeButton } 