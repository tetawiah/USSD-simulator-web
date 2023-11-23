import Button from "./Button";
import { v4 as uuidv4 } from "uuid";

export default function AddCode({ onItemChange }) {
  const handleSubmitForm = (event) => {
    const key = uuidv4().slice(-6);
    event.preventDefault();
    const newItem = {
      id: key,
      ussd: event.target.ussd.value,
      url: event.target.url.value,
      operator: event.target.operator.value,
      phone: event.target.phone.value,
    };
    onItemChange(newItem);
  };

  return (
    <div className="sub-form">
      <form className="my-form" onSubmit={handleSubmitForm}>
        <label htmlFor="ussd">USSD Code</label>
        <input name="ussd" className="form-input" required />
        <br />
        <label htmlFor="url">URL</label>
        <input type="text" name="url" className="form-input" required />
        <br />
        <select
          name="operator"
          defaultValue="Select operator"
          className="form-select"
          required
        >
          <option disabled>Select operator</option>
          <option>MTN</option>
          <option>Vodafone</option>
          <option>AT</option>
        </select>
        <br />
        <label htmlFor="phone">Phone number</label>
        <input name="phone" className="form-input" required />
        <br />
        <div className="form-btn-div">
          <Button content="Submit" size={150} type="submit" />
        </div>
      </form>
    </div>
  );
}
