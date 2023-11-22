import AddCode from "./AddCode";
import Codes from "./Codes";
import Button from "./Button";
import { useEffect, useState } from "react";

export default function App() {
  const [item, setItem] = useState({});

  function handleSetItem(newItem) {
    setItem(newItem);
  }

  useEffect(() => {
    localStorage.setItem(`${item.id}`, JSON.stringify(item));
    console.log("Effect has run");
  }, [item]);

  return (
    <div className="content">
      <div className="side">
        <Button content="&#43; New Code" size={20} />
        <Codes />
      </div>
      <div className="form-container">
        <AddCode onItemChange={handleSetItem} />
      </div>
    </div>
  );
}
