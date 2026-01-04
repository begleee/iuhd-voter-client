import { useState } from 'react'
import SelectLessonType from '../../components/Lesson Type/SelectLessonType'
import Questions from '../../components/Questions';
import Button from '../../components/Button/Button';
import classes from './TypesPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearAnswers } from '../../store/rates-slice';
import { sendRates } from '../../utils/fethces';

export default function TypesPage() {
  const { groupId, type, teacherId, answers } = useSelector(state => state.rates);
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

    const response = await sendRates(rate);

    if(!response.ok) {
      console.error(response);
      setSuccess("Something went wrong");
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
      setSuccess("Rated successfully");
      dispatch(clearAnswers());
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <SelectLessonType/>
      {type && <Questions/>}
      <div className={classes.submitField}>
        {answers.length == 5 && <Button>Submit Rating</Button>}
        {success && (
          <>
            <p className={isSuccess ? classes.success : classes.unsuccess}>{success}</p>
          </>
        )}
      </div>
    </form>
  )
}
