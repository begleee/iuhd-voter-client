import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import classes from './SelectTeacher.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setTeacherId, setTypes } from '../../store/rates-slice';

export default function SelectTeacher() {
  const dispatch = useDispatch();
  const { data} = useSelector(state => state.rates);
  const navigate = useNavigate();

  function handleSelectValue(e) {
    const id = parseInt(e.target.value);
    dispatch(setTeacherId(id));
    const teacher = data.find(obj => obj.teacherId === id);
    const types = teacher.lessonTypes;
    dispatch(setTypes(types));
    navigate('../lessontypes');
  }

  return (
    <label className={classes.label} htmlFor="teacherName">
      <p>Select Teacher</p>
      <div className={classes.container}>
        {!data && <p>Loading...</p>}
        {data && data.map(teacher => ( 
            <Button key={teacher.teacherId} onClick={handleSelectValue} type='button' value={teacher.teacherId}>
              {teacher.name}{" "}{teacher.surname}
            </Button>
        ))}
      </div>
    </label>
  )
}
