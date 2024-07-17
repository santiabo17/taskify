import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../actions";
import { CustomSelect } from "./CustomSelect";

function TodosFilter(){
    const darkMode = useSelector(state => state.darkMode);
    const palette = darkMode ? 
                    {primary: 'white', secondary: 'black', background: 'slate-800'} : 
                    {primary: 'black', secondary: 'white', background: 'slate-200'}
    return(
        <div className="absolute flex gap-3 top-10 left-10 z-10">
            <h4 className={`${darkMode ? 'text-white' : 'text-slate-800'}`}>Filter: </h4>
            <CustomSelect pallette={palette}/>
        </div>
    )
}
 export {TodosFilter}