import { useState } from "react";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";

export default function AddCode({ onItemChange }) {
  const [ussd, setUssd] = useState("");
  const [operator, setOperator] = useState("Select operator");
  const [url, setUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({});

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (validateForm() === false) return;
    const key = uuidv4().slice(-6);
    const newItem = {
      id: key,
      ussd: ussd,
      url: url,
      operator: operator,
      phone: phone,
    };
    onItemChange(newItem);
  };

  const validateForm = () => {
    return error.url || error.phone || error.ussd ? false : true;
  };

  const validateUrl = () => {
    if (
      !/^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g.test(
        url
      )
    ) {
      setError((err) => ({ ...err, url: "Invalid url" }));
    } else {
      setError((err) => ({ ...err, url: "" }));
    }
  };

  const validatePhone = () => {
    if (!/\d{10}/.test(phone)) {
      setError((err) => ({
        ...err,
        phone: "Phone number must be exactly 10 digits",
      }));
    } else {
      setError((err) => ({ ...err, phone: "" }));
    }
  };

  const validateUssd = () => {
    if (!/^\*\d{3}((\*\d+)?)+#$/.test(ussd)) {
      setError((err) => ({
        ...err,
        ussd: "USSD must start with * and end with #",
      }));
    } else {
      setError((err) => ({ ...err, ussd: "" }));
    }
  };

  return (
    <div className="sub-form">
      <form className="my-form" onSubmit={handleSubmitForm}>
        <label htmlFor="ussd">USSD Code</label>
        <input
          name="ussd"
          className="form-input"
          required
          value={ussd}
          onBlur={validateUssd}
          onChange={(e) => setUssd(e.target.value)}
        />
        {error.ussd && <p className="err-val">{error.ussd}</p>}
        <br />
        <label htmlFor="url">URL</label>
        <input
          type="text"
          name="url"
          className="form-input"
          required
          value={url}
          onBlur={validateUrl}
          onChange={(e) => setUrl(e.target.value)}
        />
        {error.url && <p className="err-val">{error.url}</p>}
        <br />
        <select
          name="operator"
          className="form-select"
          required
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option disabled>Select Operator</option>
          <option>MTN</option>
          <option>Vodafone</option>
          <option>AT</option>
        </select>
        <br />
        <label htmlFor="phone">Phone number</label>
        <input
          name="phone"
          className="form-input"
          required
          value={phone}
          onBlur={validatePhone}
          onChange={(e) => setPhone("233" + e.target.value.slice(1))}
        />
        {error.phone && <p className="err-val">{error.phone}</p>}
        <br />
        <div className="form-btn-div">
          <Button content="Submit" size={150} type="submit" />
        </div>
      </form>
    </div>
  );
}
