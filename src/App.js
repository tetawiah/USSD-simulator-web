import AddCode from "./AddCode";
import ListCodes from "./ListCodes";
import Button from "./Button";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import Response from "./Response";
import RandomDigit from "./utils/RandomDigit";

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [isOpen, setIsOpen] = useState(true);

  const [response,setResponse] = useState("");
  const [userInput,setUserInput] = useState("");
  const [responseError,setResponseError] = useState("");

  const [request, setRequest] = useState("");
  const [errorCodeList, setErrorCodeList] = useState("");


  const key = "ussd_data";

  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  function handleOnItemChange(newItem) {
    setNewItem(newItem);
  }

  function handleUserInput (input) {
    setUserInput(input);
  }

  function handleSetResponse(data) {
    setIsOpen(false);
    console.log(data)
    setResponse(data);
  }

  function handleCodeClicked (request) {
    console.log("url is being set");
    setRequest(request);
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


  useEffect(() => {
    if (request.url) {
      const payload = {
        USERID : "Spectrum",
        MSISDN : request.phone,
        SESSIONID : RandomDigit(),
        NETWORK : request.operator,
        MSGTYPE : false,
        USERDATA : userInput || request.ussd ,
      };
      console.log(payload);
      setErrorCodeList("");
      console.log("sendingg request");
      fetch(request.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({body: payload}),
        body: JSON.stringify(payload)

      })
          .then((response) => response.json())
          .then(data=> handleSetResponse(data))
          .catch((error) => {
            console.log(error);
            setErrorCodeList(error);
          });
    }
  }, [request,userInput]);


  return (
    <div className="content">
      <div className="l-side">
        <Button content="&#43; New Code" width={200} onClick={handleIsOpen} />
        <ListCodes newItems={items} onCodeClicked={handleCodeClicked} error={errorCodeList}/>
      </div>
      <div className="r-side">
        {isOpen ? (
          <div className="form-container">
            <AddCode onItemChange={handleOnItemChange} />
          </div>
        ) : null}
        <Response response={response}/>
        <InputField onSubmitInput={handleUserInput}/>
      </div>
    </div>
  );
}
