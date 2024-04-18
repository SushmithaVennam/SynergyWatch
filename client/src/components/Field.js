import React from "react";
import { Button, Form, Container } from "react-bootstrap";

export const Field = ({ value, onChange, placeholder, name }) => {
  return (
    <div className="field-container mb-3">
      {/* <label htmlFor={htmlfor}>{label}</label> */}
      <input
        className="form-control "
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};
