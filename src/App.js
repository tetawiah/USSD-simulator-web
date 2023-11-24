import AddCode from "./AddCode";
import Codes from "./Codes";
import Button from "./Button";
import InputField from "./InputField";
import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const key = "ussd_data";

  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  function handleOnItemChange(newItem) {
    setNewItem(newItem);
  }

  useEffect(() => {
    let data = localStorage.getItem(key);

    const oldData = data ? JSON.parse(data) : [];
    const newData = [...oldData, newItem];

    if (Object.values(newItem).length !== 0) {
      localStorage.setItem(key, JSON.stringify(newData));
      setItems(newData);
      console.log("App Effect has run");
    }
  }, [newItem]);

  return (
    <div className="content">
      <div className="l-side">
        <Button content="&#43; New Code" width={200} onClick={handleIsOpen} />
        <Codes newItems={items} />
      </div>
      <div className="r-side">
        {isOpen ? (
          <div className="form-container">
            <AddCode onItemChange={handleOnItemChange} />
          </div>
        ) : null}
        <InputField />
      </div>
    </div>
  );
}
