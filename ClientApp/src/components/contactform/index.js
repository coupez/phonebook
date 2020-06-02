import React, { useCallback, useState } from "react";
import { Input } from "../input";
import "./style.css";

export default function ContactForm({ contact, save, errors, cancel }) {
  const [formData, setFormData] = useState(contact);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      save(formData);
    },
    [save, formData]
  );

  const onChange = useCallback(
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.trim(),
      });
    },
    [formData, setFormData]
  );

  return (
    <div className="contactform flex column">
      <form onSubmit={onSubmit}>
        <span>First name</span>
        <Input name="firstName" onChange={onChange} />

        <span>Last name</span>
        <Input name="lastName" onChange={onChange} />

        <span>Phone number</span>
        {errors.PhoneNumber &&
          errors.PhoneNumber.map((e) => <span className="error">{e}</span>)}
        <Input name="phoneNumber" onChange={onChange} />

        <button className="button" type="submit">
          Save
        </button>
        <button className="actionbutton" onClick={cancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
