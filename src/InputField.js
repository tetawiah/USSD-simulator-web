import Button from "./Button";
import {useState} from "react";

export default function InputField({onSubmitInput}) {
const [input,setInput] = useState("");

  return (
    <div className="field">
        <span>
          <input className="inp-field" value={input} onChange={e=>setInput(e.target.value)}></input>
          <Button className="field-btn" content="Send" onClick={onSubmitInput(input)}></Button>
        </span>
    </div>
  );
}
