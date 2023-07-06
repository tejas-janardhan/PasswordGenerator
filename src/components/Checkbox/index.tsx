import React from "react";
import "./Checkbox.css";

const Checkbox: React.FC<{
  id: string;
  text: string;
  checked: boolean;
  toggleChecked: () => void;
}> = ({ id, text, checked, toggleChecked }) => {
  return (
    <div className="checkbox-wrapper-24">
      <input
        type="checkbox"
        className="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => {
          toggleChecked();
        }}
      />
      <label className="checkbox" htmlFor={id}>
        <span></span>
        {text}
      </label>
    </div>
  );
};

export default Checkbox;
