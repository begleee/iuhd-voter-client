import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Container from '../components/Container/Container';

export default function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('./')
  }, [navigate]);
  
  return (
    <Container>
      <h1>Rate Your Teacher</h1>
      <main>
        <Outlet/>
      </main>
    </Container>
  )
}
