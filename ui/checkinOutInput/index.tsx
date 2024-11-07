import React from "react";
import UIInput from "../uiinput";

interface CheckInOutProps {
  id?: string;
  label?: string;
  placeholder?: string;
  onChange?: () => void;
}

const CheckInOutInput = ({ id, label }: CheckInOutProps) => {
  return (
    <div className="checkInOut">
      <label htmlFor={id} className="checkInOut-placeholder">
        {label}
      </label>
      <div className="checkInOut-inputs">
        <UIInput type="time" placeholder="start date" /> -
        <UIInput type="time" placeholder="end date" />
      </div>
    </div>
  );
};

export default CheckInOutInput;
