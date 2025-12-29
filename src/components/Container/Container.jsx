import classes from './Container.module.css'
import { useEffect } from 'react';
import AOS from 'aos';

export default function Container({children}) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  },[]) 

  return (
    <div data-aos="fade-down" className={classes.container}>
      {children}
    </div>
  )
}
