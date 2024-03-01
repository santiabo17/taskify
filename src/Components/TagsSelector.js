import { useDispatch, useSelector } from "react-redux";
import { EditIcon } from "./EditIcon";
import { CloseIcon } from "./CloseIcon";
import { PlusIcon } from "./PlusIcon";
import React from "react";
import { setTags } from "../actions";
import { getRandomColor } from "../utils";
import './style.css';

function TagsSelector({tags, setTags: setSelectedTags}) {
    const inputTags = React.useRef([]);
    const inputColorTag = React.useRef();
    const [focusTagIndex, setFocusTagIndex] = React.useState(null);
    const tagsOptions = useSelector(state => state.tags);

    const dispatch = useDispatch();

    const handleAddTag = (newIndexTag) => {
        setSelectedTags(tags => [...tags, newIndexTag]);
    }
  
    const handleRemoveTag = (removedIndexTag) => {
        const newTags = [...tags];
        const tagIndex = newTags.findIndex(tag => tag == removedIndexTag);
        newTags.splice(tagIndex, 1);
        setSelectedTags(newTags);
    }

    const setFocusTag = (index) => {
        setFocusTagIndex(index);
    }

    React.useEffect(() => {
        if(focusTagIndex != null){
            console.log('focusTagIndex', focusTagIndex);
            console.log(inputTags.current);
            inputTags.current[focusTagIndex].focus();
        }
    }, [focusTagIndex])

    const setTagName = (e) => {
      const newTagsOptions = [...tagsOptions];
        if(e.target.value.length > 0){
          newTagsOptions[focusTagIndex].value = e.target.value;
          console.log(newTagsOptions); 
          dispatch(setTags(newTagsOptions));
        } else {
          newTagsOptions.splice(focusTagIndex,1);
          dispatch(setTags(newTagsOptions));
          setFocusTagIndex(null);
        }
        
    }

    const setTagColor = (e) => {
      const newTagsOptions = [...tagsOptions];
      newTagsOptions[focusTagIndex].color = e.target.value;
      dispatch(setTags(newTagsOptions));
    }

    const addNewTag = (e) => {
      e.preventDefault();
      const newTagsOptions = [...tagsOptions];
      const tagColor = getRandomColor();
      newTagsOptions.push({value: '', color: tagColor});
      dispatch(setTags(newTagsOptions));
      setFocusTagIndex(newTagsOptions.length - 1);
    }

    return (
        <div className='w-3/5 space-y-1 gap-2 mb-6'>
          {tagsOptions.map((tag, key) => (
            <div 
              className={`relative flex items-center w-full h-7 py-0.5 box-content ${tags.includes(key) && 'border-[3px] border-white'}`}>
              <div 
              style={{backgroundColor: tag.color}} 
              className='w-full px-2 h-full flex items-center justify-between text-white font-medium tag_item'
              >
                  <input 
                    ref={(el) => inputTags.current[key] = el}
                    type="text" 
                    readOnly={key != focusTagIndex}
                    value={tag.value} 
                    onChange={setTagName}
                    onBlur={setTagName}
                    className="h-full w-2/3 bg-transparent cursor-default focus: outline-0 "
                  />
                  <div className="flex w-1/3 h-full items-center justify-end">
                    {key == focusTagIndex && 
                    <input 
                        type="color" 
                        className="p-0 bg-transparent cursor-pointer rounded-full w-5 h-5 shadow-[0_0_10px_0px_rgb(0,0,0)] color_selector mr-4"
                        defaultValue={tag.color}
                        ref={inputColorTag}
                        onChange={setTagColor}
                    />}
                    <EditIcon className='cursor-pointer' onClick={() => setFocusTag(key)}/>
                  </div>
              </div>
              <div className="cursor-pointer h-full w-7">{tags.includes(key) ? 
                <CloseIcon 
                  className='bg-red-800 text-white w-full h-full flex items-center justify-center'
                  onClick={() => handleRemoveTag(key)}
                /> : 
                <PlusIcon 
                  className='bg-blue-800 text-white w-full h-full flex items-center justify-center' 
                  onClick={() => handleAddTag(key)}
                />}
              </div>
            </div>
          ))}
          <button className="bg-gray-800 text-white w-full h-7 py-0.5 font-bold text-md" onClick={addNewTag}>Add new Tag</button>
        </div>
    )
}

export {TagsSelector}