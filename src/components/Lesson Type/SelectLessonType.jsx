import { useDispatch, useSelector } from 'react-redux';
import classes from './SelectLessonType.module.css';
import { setType, setIsAnswering } from '../../store/rates-slice';

export default function SelectLessonType() {
  const dispatch = useDispatch();
  const { types } = useSelector(state => state.rates);
  function handleSelectValue(value) {
    dispatch(setType(value));
    dispatch(setIsAnswering(true));
  }
  
  return (
    <>
      <label className={classes.label}>
        Select Lesson Type
      </label>
      {!types && <option>Loading...</option>}
      {types && types.map(item => ( 
        <label key={item} className={classes.glassRadio}>
          <input
            type="radio"
            name="lessonType"
            value={item}
            onChange={() => handleSelectValue(item)}
          />
          <span className={classes.radioContent}>
            {item}
          </span>
        </label>
      ))}
    </>
  )
}
