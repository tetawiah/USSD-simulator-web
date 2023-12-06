import AddCode from "./AddCode";
import ListCodes from "./ListCodes";
import Button from "./Button";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import Response from "./Response";
import RandomDigit from "./utils/RandomDigit";
import EditCode from "./EditCode";

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [isAddFormOpen, setIsAddFormOpen] = useState(true);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const [response,setResponse] = useState("");
  const [userInput,setUserInput] = useState("");
  const [responseError,setResponseError] = useState("");
  const [isResLoading,setIsResLoading] = useState(false);
  const [canDisplayInput,setDisplayInput] = useState(false);

  const [request, setRequest] = useState("");
  const [errorCodeList, setErrorCodeList] = useState("");

  const[selected,setSelected] = useState("");
  const[itemsEdit,setItemsEdit] = useState({});

  const key = "ussd_data";

  function handleIsAddFormOpen() {
    setIsAddFormOpen(!isAddFormOpen);
  }

  function handleOnItemChange(newItem) {
    setNewItem(newItem);
  }

  function handleUserInput (input) {
    console.log('send button clicked');
    setUserInput(input);
  }

  function handleSetResponse(data) {
    setIsAddFormOpen(false);
    if(data.MSGTYPE === false) {
      setDisplayInput(true);
    }
    console.log(data)
    setResponse(data);
  }

  function handleCodeClicked (request) {
    console.log("url is being set");
    const sessionID = RandomDigit();
    setRequest({...request,sessionID});
  }

  function handleOnEditClicked(id) {
    setIsAddFormOpen(false);
    setIsEditFormOpen(true);
    const filtered = items.filter(item=> item.id === id )[0];
    setItemsEdit(filtered);
  }

  function handleOnEditItem (editedItem) {
    let newData = [];
    setItems(items=> {
      const filtered = items.filter(item => item.id !== editedItem.id);
      return newData = [...filtered,editedItem];

       });
    localStorage.setItem(key, JSON.stringify(newData));
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
    console.log('effect run');
    if (request.url) {
      const payload = {
        USERID : "Spectrum",
        MSISDN : request.phone,
        SESSIONID : request.sessionID,
        NETWORK : request.operator,
        MSGTYPE : false,
        USERDATA : userInput || request.ussd ,
      };
      console.log(payload);
      setErrorCodeList("");
      console.log("sendingg request");
      setIsResLoading(true);
      fetch(request.url, {
        method: "POST",
        headers: {
          "Accept" : "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)

      })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Request could not be processed");
            }
            return response.json()
            })
          .then(data=> {
            handleSetResponse(data);
            setIsResLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setErrorCodeList(error);
            setIsResLoading(false);
          });
    }
  }, [request,userInput]);


  return (
    <div className="content">
      <div className="l-side">
        <Button content="&#43; New Code" width={200} onClick={handleIsAddFormOpen} />
        <ListCodes newItems={items} onCodeClicked={handleCodeClicked} error={errorCodeList} onClickEdit={handleOnEditClicked}/>
      </div>
      <div className="r-side">
        {isAddFormOpen ? (
          <div className="form-container">
            <AddCode onItemChange={handleOnItemChange} />
          </div>
        ) : null}
        {isEditFormOpen ? (
            <div className="form-container">
              <EditCode item={itemsEdit} onEditItem={handleOnEditItem}></EditCode>
            </div>
        ): null}
        {response && <Response response={response}/>}
        <InputField onSubmitInput={handleUserInput}/>
      </div>
    </div>
  );
}
