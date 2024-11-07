"use client";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import {
  CSSProperties,
  ChangeEvent,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  MouseEventHandler,
  WheelEventHandler,
  useEffect,
  useState,
} from "react";

interface UIInputProps {
  id?: string;
  label?: string;
  name?: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | "location";
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  defaultValue?: string | number | null;
  instruction?: string;
  disabled?: boolean;
  autoComplete?: string;
  min?: string;
  max?: string;
  maxLength?: number;
  pattern?: string;
  onWheel?: WheelEventHandler<HTMLInputElement>;
  isNepaliDatePicker?: boolean;
  location?: boolean;
}

export default function UIInput({
  id,
  label,
  name,
  isRequired,
  placeholder,
  type,
  style,
  onClick,
  onChange,
  onWheel,
  error,
  defaultValue,
  instruction,
  disabled,
  autoComplete,
  max,
  min,
  maxLength,
  pattern,
  isNepaliDatePicker,
}: UIInputProps) {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(defaultValue ? defaultValue.toString() : "");
  }, [defaultValue]);
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow((prev) => !prev);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    if (!maxLength || inputValue.length <= maxLength) {
      setValue(inputValue);
      if (onChange) {
        onChange(e);
      }
    }
  };

  const handleWheel: WheelEventHandler<HTMLInputElement> = (e) => {
    const element = e.currentTarget;
    element.blur();
    e.stopPropagation();
    setTimeout(() => element.focus(), 0);
  };

  const handleNepaliDateChange = (date: string) => {
    setValue(date);
    if (onChange) {
      const event = {
        target: {
          value: date,
          name: name,
        },
      } as ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className="inputfield" style={style}>
      {label ? (
        <label htmlFor={id ? id : ""} className="inputfield-label">
          {label}
          <span>{isRequired ? "*" : ""}</span>
        </label>
      ) : null}

      <div className="inputfield-wrapper" style={{ position: "relative" }}>
        {type === "date" && isNepaliDatePicker ? (
          <NepaliDatePicker
            className={` ${error ? "error" : ""}`}
            onChange={handleNepaliDateChange}
            value={value}
            inputClassName="inputfield-input"
          />
        ) : (
          <input
            type={type === "password" ? (show ? "text" : "password") : type}
            id={id}
            name={name}
            className={`inputfield-input ${error ? "error" : ""}`}
            placeholder={placeholder}
            onClick={onClick}
            onChange={handleChange}
            value={value}
            required={isRequired}
            disabled={disabled}
            autoComplete={autoComplete ?? name}
            min={min}
            max={max}
            maxLength={maxLength}
            pattern={pattern}
            style={{
              borderRadius: "8px",

              paddingRight: type === "location" ? "2.5rem" : undefined, // Add padding to the right if location icon is present
            }}
            onWheel={handleWheel}
          />
        )}

        {type === "location" && (
          <i
            className="fa-solid fa-location-dot location-icon"
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none", // Ensure the icon doesn't interfere with input events
              color: error ? "#ff4d4f" : "#888", // Example color, change as needed
            }}
          ></i>
        )}
      </div>

      {error ? <span className="inputfield-error">{error}</span> : null}

      {type === "password" ? (
        <i
          className={`fa-regular fa-eye${show ? "" : "-slash"}`}
          onClick={toggleShow}
          style={{
            bottom: label && !error ? "20%" : !label && error ? "65%" : "50%",
          }}
        ></i>
      ) : null}
      {instruction ? (
        <p className="inputfield-instruction">{instruction}</p>
      ) : null}
    </div>
  );
}
