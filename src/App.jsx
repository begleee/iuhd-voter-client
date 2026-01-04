import 'aos/dist/aos.css'
import './App.css'
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TeachersPage from './pages/TeachersPage';
import Root from './pages/Root';
import TypesPage from './pages/Types/TypesPage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from './utils/fethces';
import { setData } from './store/rates-slice';

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
]);


function App() {
  const dispatch = useDispatch();
  const groupId = useSelector(state => state.rates.groupId);

  useEffect(() => {
    if(!groupId) return;
    async function getTeachers() {
      const data = await fetchTeachers(groupId);
      dispatch(setData(data));
    }
    getTeachers();
  }, [groupId, dispatch])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
