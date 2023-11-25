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
    const data = localStorage.getItem(key);
    const oldData = data ? JSON.parse(data) : [];
    if (oldData.length > 0) {
      setItems(oldData);
      console.log(
        "Effect to get the old data and set it when component first mounts"
      );
    }
  }, []);

  //runs on first mount also instead of depending on newItem
  useEffect(() => {
    const newData = [...items, newItem];
    if (Object.values(newItem).length > 0) {
      localStorage.setItem(key, JSON.stringify(newData));
      setItems(newData);

      console.log("Effect to set state with new data");
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
