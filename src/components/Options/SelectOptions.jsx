import { useState, useRef, useEffect } from 'react';
import classes from './SelectOptions.module.css';
import { updateAnswers } from '../../store/rates-slice';
import { useDispatch, useSelector } from 'react-redux';

export default function SelectOptions({ label, id }) {
  const { answers } = useSelector(state => state.rates);
  const value = answers.find(answer => answer.questionId === id).value;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [openUp, setOpenUp] = useState(false);
  const triggerRef = useRef(null);

  function handleChage(val) {
    const value = parseInt(val);
    dispatch(updateAnswers({id, value}));
  }

  const options = [
    { value: "5", label: "5: Always" },
    { value: "4", label: "4: Often" },
    { value: "3", label: "3: To the level of 50%" },
    { value: "2", label: "2: Rarely" },
    { value: "1", label: "1: Never" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 220;
      setOpenUp(spaceBelow < dropdownHeight);
    }
    setOpen(prev => !prev);
  };

  return (
    <div ref={wrapperRef} className={classes.glassSelectWrapper}>
      <p className={classes.glassLabel}>{label}</p>

      <div
        ref={triggerRef}
        className={classes.glassSelectTrigger}
        onClick={toggleOpen}
      >
        {options.find(opt => opt.value === "" + value)?.label || "Select"}
        <span className={`${classes.arrow} ${open ? classes.open : ""}`} />
      </div>

      {open && (
        <ul
          className={`${classes.glassSelectOptions} ${
            openUp ? classes.openUp : ""
          }`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                handleChage(option.value);
                setOpen(false);
              }}
              className={value === option.value ? classes.selected : ""}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
