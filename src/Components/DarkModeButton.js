import { useSelector } from "react-redux"
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";

function DarkModeButton({className, onClick}){
    const darkMode = useSelector(state => state.darkMode);
    return (darkMode ?  <SunIcon className={className + ' text-white'} onClick={onClick}/> : <MoonIcon className={className + ' text-slate-800'} onClick={onClick}/>)
}

export { DarkModeButton } 