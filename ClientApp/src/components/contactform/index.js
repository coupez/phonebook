import React, { useCallback, useState } from "react";
import { Input } from "../input";
import "./style.css";

export default function ContactForm({
  contact,
  save,
  errors,
  cancel,
  saving,
}) {
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
      let value = e.target.value;

      console.log(e.target.type);
      if (e.target.type === "tel") {
        value = value.replace(/[^0-9+ ]/g, "");
      }

      setFormData({
        ...formData,
        [e.target.name]: value,
      });
    },
    [formData, setFormData]
  );

  return (
    <div className="contactform flex column">
      <form onSubmit={onSubmit}>
        <span>First name</span>
        <Input
          disabled={saving}
          value={formData.firstName || ""}
          name="firstName"
          onChange={onChange}
        />

        <span>Last name</span>
        <Input
          disabled={saving}
          value={formData.lastName || ""}
          name="lastName"
          onChange={onChange}
        />

        <span>Phone number</span>
        {errors.PhoneNumber &&
          errors.PhoneNumber.map((e) => <span className="error">{e}</span>)}
        <Input
          disabled={saving}
          value={formData.phoneNumber || ""}
          name="phoneNumber"
          type="tel"
          onChange={onChange}
        />

        <button className="button" type="submit" disabled={saving}>
          Save
        </button>
        <button className="actionbutton" onClick={cancel} disabled={saving}>
          Go back
        </button>
      </form>
    </div>
  );
}
