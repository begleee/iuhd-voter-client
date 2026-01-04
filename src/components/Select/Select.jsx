import { useNavigate } from "react-router-dom";
import classes from  './Select.module.css'
import { useState } from "react";
import { useSelector } from "react-redux";
import { setGroupId } from '../../store/rates-slice';
import { useDispatch } from "react-redux";

export default function Select({label}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const groups = useSelector(state => state.rates.groups);
  const navigate = useNavigate();

  function handleSelectValue (id) {
    dispatch(setGroupId(id));
    navigate("./teachers");
  }

  return (
    <>
      <div className={classes.glassSelect}>
        <button
          className={classes.glassSelectTrigger}
          onClick={() => setShow(prev => !prev)}
        >
          {label}
          <span className={`${classes.arrow} ${show ? classes.open : ""}`} />
        </button>

        {!groups && <p className={classes.loading}>Loading...</p>}

        {show && groups && (
          <ul className={classes.glassSelectOptions}>
            {groups.map(item => (
              <li
                key={item.id}
                onClick={() => handleSelectValue(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
