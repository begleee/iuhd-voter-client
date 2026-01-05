import { useState } from 'react'
import SelectLessonType from '../../components/Lesson Type/SelectLessonType'
import Questions from '../../components/Questions';
import Button from '../../components/Button/Button';
import classes from './TypesPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearAnswers } from '../../store/rates-slice';
import { sendRates } from '../../utils/fethces';
import { clearAll } from '../../store/answers-slice';

function haveSameItems(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const a = [...arr1].sort();
  const b = [...arr2].sort();

  return a.every((item, index) => item === b[index]);
}

export default function TypesPage() {
  const { groupId, type, teacherId, answers, types } = useSelector(state => state.rates);
  const { completed, answeredTypes } = useSelector(state => state.answers);
  const [isSuccess, setIsSuccess] = useState(false);
  const [success, setSuccess] = useState();
  const dispatch = useDispatch();

  const rate = { teacherId, groupId, answers, type };

  async function handleSubmit(e) {
    e.preventDefault();
    const hasEmptyAnswer = rate.answers.some(answer => answer.value === 0);
    if (hasEmptyAnswer) {
      setSuccess("Please answer all questions"); 
      setIsSuccess(false);
      return; 
    }

    if(!haveSameItems(answeredTypes, types)) {
      setSuccess("Please answer to questions of all lessons");
      setIsSuccess(false);
      return;
    }

    completed.map(async item => {
      const response = await sendRates({
        teacherId,
        groupId,
        answers: item.answers,
        type: item.type
      });
      if(!response.ok) {
        console.error(response);
        setSuccess("Something went wrong");
        setIsSuccess(false);
        dispatch(clearAll());
      } else {
        setIsSuccess(true);
        setSuccess("Rated successfully");
        dispatch(clearAnswers());
      }
    })    
  }

  return (
    <form onSubmit={handleSubmit}>
      <SelectLessonType/>
      {type && <Questions/>}
      <div className={classes.submitField}>
        <Button>Submit Rating</Button>
        {success && (
          <>
            <p className={isSuccess ? classes.success : classes.unsuccess}>{success}</p>
          </>
        )}
      </div>
    </form>
  )
}
