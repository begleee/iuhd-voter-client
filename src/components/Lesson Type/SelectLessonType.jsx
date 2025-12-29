import { useState } from 'react';
import { useRate } from '../../context/rates-context';
import classes from './SelectLessonType.module.css'

export default function SelectLessonType() {
  const {setType, types, isAnswering, setIsAnswering} = useRate();
  const [warning, setWarning] = useState();
  
  function handleSelectValue(value) {
    if(isAnswering){
      return;
    } 
    setType(value);
    setIsAnswering(true);
  }

  function handleClick() {
    if(isAnswering) {
      setWarning("Answer to all questions first");
    }
  }
  
  return (
    <>
      <label className={classes.label}>
        Select Lesson Type
      </label>
      {!types && <option>Loading...</option>}
      {types && types.map(item => ( 
        <label key={item} className={classes.glassRadio} onClick={handleClick}>
          <input
            type="radio"
            name="lessonType"
            value={item}
            onChange={() => handleSelectValue(item)}
            disabled={isAnswering}
          />
          <span className={classes.radioContent}>
            {item}
          </span>
        </label>
      ))}
      {isAnswering && (
        <p style={{'color': 'red'}}>{warning}</p>
      )}
    </>
  )
}
