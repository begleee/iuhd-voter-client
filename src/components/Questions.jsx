import { useSelector } from 'react-redux'
import SelectOptions from './Options/SelectOptions'

export default function Questions() {
  const questions = useSelector(state => state.rates.questions)

  return (
    <>
      {
        questions.map(question => (
          <SelectOptions id={question.id} key={question.id} label={question.text}/>
        ))
      }
    </>
  )
}
