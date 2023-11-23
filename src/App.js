import AddCode from "./AddCode";
import Codes from "./Codes";
import Button from "./Button";
import { useEffect, useState } from "react";

export default function App() {
  const [item, setItem] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  function handleSetItem(newItem) {
    setItem(newItem);
  }

  useEffect(() => {
    console.log(Object.values(item));
    if (Object.values(item).length !== 0) {
      localStorage.setItem(`${item.id}`, JSON.stringify(item));
      console.log("App Effect has run");
    }
  }, [item]);

  return (
    <div className="content">
      <div className="side">
        <Button content="&#43; New Code" size={200} onClick={handleIsOpen} />
        <Codes newData={item} />
      </div>
      {isOpen ? (
        <div className="form-container">
          <AddCode onItemChange={handleSetItem} />
        </div>
      ) : null}
    </div>
  );
}
