import { useState } from 'react'
import SelectLessonType from '../../components/Lesson Type/SelectLessonType'
import { useRate } from '../../context/rates-context'
import Questions from '../../components/Questions';
import url from '../../utils/url';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import classes from './TypesPage.module.css'

export default function TypesPage() {
  const {type, teacherId, groupId, answers} = useRate();  
  const [isSuccess, setIsSuccess] = useState(false);
  const [success, setSuccess] = useState();
  const navigate = useNavigate();


  async function handleSubmit() {
    const rate = {
      teacherId,
      groupId,
      answers,
      type,
    };

    const hasEmptyAnswer = rate.answers.some(answer => answer.value === 0);

    if (hasEmptyAnswer) {
      setSuccess("Please answer all questions"); 
      setIsSuccess(false);
      return; 
    }

    try {
      const response = await fetch(url + "/teacher/rate", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rate),
      });
      if (!response.ok) return;

      setIsSuccess(true);
      setSuccess("Rated successfully");
    } catch (err) {
      console.error(err);
      setSuccess("Something went wrong");
      setIsSuccess(false);
    }
  }

  return (
    <>
      <SelectLessonType/>
      {type && <Questions/>}
      <div className={classes.submitField}>
        {answers.length == 5 && <Button onClick={handleSubmit}>Submit Rating</Button>}
        {success && (
          <>
            <p className={isSuccess ? classes.success : classes.unsuccess}>{success}</p>
            <Button onClick={() => navigate('../teachers')}>Go to teachers page</Button>
          </>
        )}
      </div>
    </>
  )
}
