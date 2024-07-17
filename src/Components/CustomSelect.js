import React from "react"
import { setFilter } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { DownArrowIcon } from "./DownArrowIcon";

function CustomSelect({pallette}){
    const tagsOptions = useSelector(state => state.tags);
    const [showOptions, setShowOptions] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState('All');
    
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setFilter(selectedOption));
    }, [selectedOption])

    return (
        <div className="w-40">
            <div className={`text-${pallette.primary} flex justify-between px-2 cursor-pointer border-2 border-${pallette.primary} rounded-sm`} onClick={() => setShowOptions(!showOptions)}>
                <h4>{selectedOption}</h4>
                <DownArrowIcon className={'w-5 flex items-center'}/>
            </div>
            {showOptions && 
                <div className={`mt-1 text-${pallette.primary} bg-${pallette.background}`}>
                    <h5 
                        key={'All'} 
                        className={`border-[1.5px] border-${pallette.primary} cursor-pointer transition-all hover:bg-${pallette.primary} hover:text-${pallette.secondary}`}
                        onClick={() => {
                            setSelectedOption('All');
                            setShowOptions(false);
                        }}
                    >
                        {'All'}
                    </h5>
                    {tagsOptions.map(option => <h5 
                        key={option.value} 
                        className={`border-[1.5px] border-${pallette.primary} cursor-pointer transition-all hover:bg-${pallette.primary} hover:text-${pallette.secondary}`}
                        onClick={() => {
                            setSelectedOption(option.value);
                            setShowOptions(false);
                        }}
                        >
                            {option.value}
                        </h5>)}
                </div>}
        </div>
    )
}

export {CustomSelect}