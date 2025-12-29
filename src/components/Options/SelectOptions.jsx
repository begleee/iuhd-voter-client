import { useState, useRef, useEffect } from 'react';
import { useRate } from '../../context/rates-context';
import classes from './SelectOptions.module.css';
export default function SelectOptions({ label, id }) {
  const [value, setValue] = useState();
  const {updateAnswer, answers} = useRate();

  function handleChage(val) {
    const value = parseInt(val);
    setValue(val);
    updateAnswer(id, value);
    console.log(answers);
  }

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [openUp, setOpenUp] = useState(false);
  const triggerRef = useRef(null);

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
        {options.find(opt => opt.value === value)?.label || "Select"}
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
