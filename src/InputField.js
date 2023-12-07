import Button from "./Button";
import {useState} from "react";

export default function InputField({onSubmitInput,canDisplayInput}) {
const [input,setInput] = useState("");

const handleInput = (e) => {
    e.preventDefault();
    onSubmitInput(input);
    setInput("");
}
  return (
    <div className="field">
        <form onSubmit={handleInput}>
            <span>
                    <input className="inp-field" value={input} onChange={e=>setInput(e.target.value)}></input>
                    <Button className="field-btn" content="Send" type="submit"></Button>
        </span>
        </form>

    </div>
  );
}
