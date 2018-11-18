import React from "react";

// Nothing special here, just a simple textarea component to be used in its entirety.
export default ({ id, value, readOnly, disabled, placeholder, onChange }) => {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      onChange={onChange}
    />
  );
};
