import AOS from 'aos';
import 'aos/dist/aos.css'
import './App.css'
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TeachersPage from './pages/TeachersPage';
import { useRate } from './context/rates-context';
import url from './utils/url';
import Root from './pages/Root';
import TypesPage from './pages/Types/TypesPage';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Root/>,
    children: [
      { index: true, element: <HomePage/>},
      {
        path: 'teachers',
        element: <TeachersPage/>
      },
      {
        path: 'lessontypes',
        element: <TypesPage/>,
      }
    ]
  }
])

function App() {
  const {setGroups, setData, setQuestions, groupId, type} = useRate();

  useEffect(() => {
    async function getGroup() {
      const res = await fetch(url +'/group/all');
      const data = await res.json();
      setGroups(data.groups);
    }
    getGroup();
  }, [setGroups])

  
  useEffect(() => {
    if(!groupId) return;
    async function getTeachers() {
      const res = await fetch(url + "/teacher/group/" + groupId);
      const data = await res.json();
      setData(data);
      console.log(data);
    }
    getTeachers();
  }, [groupId, setData])

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch(url + "/question/all");
      const data = await res.json();
      setQuestions(data);
      console.log(data);
    }
    getQuestions();
  }, [type, setQuestions])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
