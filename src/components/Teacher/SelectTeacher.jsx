import { useNavigate } from 'react-router-dom';
import { useRate } from '../../context/rates-context';
import Button from '../Button/Button';
import classes from './SelectTeacher.module.css';

export default function SelectTeacher() {
  const {setTeacherId, setTypes, data} = useRate();
  const navigate = useNavigate();

  function handleSelectValue(e) {
    const id = parseInt(e.target.value);
    setTeacherId(id);
    const teacher = data.find(obj => obj.teacherId === id);
    const types = teacher.lessonTypes;
    setTypes(types);
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
