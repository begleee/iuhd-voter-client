import { useState } from "react";
import { RatesContext } from "./rates-context";

const initialAnswers = Array.from({ length: 5 }, (_, i) => ({
  questionId: i + 1,
  value: 0
}));

export function RatesProvider({children}) {
  const [groupId, setGroupId] = useState();
  const [types, setTypes] = useState();
  const [type, setType] = useState();
  const [teacherId, setTeacherId] = useState();
  const [answers, setAnswers] = useState(initialAnswers);
  const [groups, setGroups] = useState();
  const [data, setData] = useState();
  const [questions, setQuestions] = useState();
  const [isAnswering, setIsAnswering] = useState(false);

  function updateAnswer(questionId, value) {
    setAnswers(prevState => prevState.map(item => 
      item.questionId === questionId ? { ...item, value} : item
    ))
  }

  return <RatesContext.Provider
    value={{
      groups,
      setGroups,
      data,
      setData,
      questions,
      setQuestions,
      groupId,
      setGroupId,
      types,
      setTypes,
      type,
      setType,
      teacherId,setTeacherId,
      answers,
      setAnswers,
      updateAnswer,
      isAnswering,
      setIsAnswering
    }}>
    {children}
  </RatesContext.Provider>

}