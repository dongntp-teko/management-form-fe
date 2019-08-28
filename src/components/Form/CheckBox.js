import React from 'reactn';

const CheckBox = ({ value1 }) => {
  return (
    <div className="form-check form-check-inline col">
      <input
        className="form-check-input"
        type="checkbox"
        name={value1.name}
        checked={value1.checked}
        onChange={value1.handleChange}
      />
      <label className="form-check-label"> {value1.label} </label>
    </div>
  );
};

export default CheckBox;
