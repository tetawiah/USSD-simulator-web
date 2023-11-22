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
    <form onSubmit={handleSubmitForm}>
      <label htmlFor="ussd">USSD Code</label>
      <input name="ussd"></input>
      <br />
      <label htmlFor="url">URL</label>
      <input type="text" name="url"></input>
      <br />
      <select name="operator" defaultValue="Select operator">
        <option disabled={true} selected>
          Select operator
        </option>
        <option>MTN</option>
        <option>Vodafone</option>
        <option>AT</option>
      </select>
      <br />
      <label htmlFor="phone" type="numebr">
        Phone number
      </label>
      <input name="phone"></input>
      <br />
      <Button type="submit" content="Submit" size={20} />
    </form>
  );
}
