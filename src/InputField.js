import Button from "./Button";

export default function InputField() {
  return (
    <div className="field">
      <form>
        <span>
          <input className="inp-field"></input>
          <Button className="field-btn" content="Send"></Button>
        </span>
      </form>
    </div>
  );
}
