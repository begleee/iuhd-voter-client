import { useRate } from '../context/rates-context'
import SelectOptions from './Options/SelectOptions'

export default function Questions() {
  const {questions} = useRate();

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
