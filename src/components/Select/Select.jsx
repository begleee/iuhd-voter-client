import { useRate } from "../../context/rates-context";
import { useNavigate } from "react-router-dom";
import classes from  './Select.module.css'
import { useState } from "react";

export default function Select({label}) {
  const [show, setShow] = useState(false)
  const {setGroupId, groups} = useRate();
  const navigate = useNavigate();

  function handleSelectValue (id) {
    setGroupId(id);
    navigate("./teachers");
  }

  return (
    <>
      {/* <label htmlFor={nameFor}>
        <p>{label}</p>
      </label>
      <select className={classes.select} value={groupId} onChange={handleSelectValue} id={nameFor}>
        {!groups && <option>Loading...</option>}
        {groups && <option>No option selected</option>}
        {groups && groups.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
        ))}
      </select> */}
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
