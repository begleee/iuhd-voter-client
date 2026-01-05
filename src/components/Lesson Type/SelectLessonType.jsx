import { useDispatch, useSelector } from 'react-redux';
import classes from './SelectLessonType.module.css';
import { clearAnswers, setType } from '../../store/rates-slice';
import { setIsAnswering, setWarning } from '../../store/answers-slice';

export default function SelectLessonType() {
  const dispatch = useDispatch();
  const { types, type } = useSelector(state => state.rates);
  const { isAnswering, warning, answeredTypes, completed } = useSelector(state => state.answers);

  function handleSelectValue(value) {
    if(!isAnswering) {
      dispatch(setType(value));
      dispatch(setIsAnswering(true));
      dispatch(clearAnswers());
    }
  }

  function handleClick(itemType) {
    isAnswering && dispatch(setWarning("Please complete answering to questions of " + type));
    completed.find(i => i === itemType) && dispatch(setWarning("Questoins for " + itemType + " are completed"));
  }
  
  return (
    <>
      <label className={classes.label}>
        Select Lesson Type
      </label>
      {!types && <option>Loading...</option>}
      {types && types.map(item => ( 
        <label onClick={() => handleClick(item)} key={item} className={
          answeredTypes.find(i => i === item) ? `${classes.glassRadio} ${classes.completed}` : classes.glassRadio
        }>
          <input
            type="radio"
            name="lessonType"
            value={item}
            disabled={isAnswering || answeredTypes.find(i => i === item)}
            onChange={() => handleSelectValue(item)}
          />
          <span className={classes.radioContent}>
            {item}
          </span>
        </label>
      ))}
      {warning && <p className={classes.warning}>{"Please complete answering to questions of " + type}</p>}
    </>
  )
}
