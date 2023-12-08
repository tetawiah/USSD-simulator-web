import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext } from "react";

import AddCode from "./AddCode";
import Request from "./Request";
import EditCode from "./EditCode";
import Layout from "./pages/Layout";

export const AppContext = createContext();
export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});

  const key = "ussd_data";

  function handleOnItemChange(newItem) {
    setNewItem(newItem);
  }

  // function handleCodeClicked(request) {
  //   setCanDisplayInput(true);
  //   console.log("url is being set");
  //   const sessionID = RandomDigit();
  //   setRequest({ ...request, sessionID });
  // }

  function handleOnEditItem(editedItem) {
    let newData = [];
    setItems((items) => {
      const filtered = items.filter((item) => item.id !== editedItem.id);
      return (newData = [...filtered, editedItem]);
    });
    localStorage.setItem(key, JSON.stringify(newData));
  }

  function handleOnDeleteItem(id) {
    if (!window.confirm("Are you sure you want to delete ?")) {
      return;
    }
    let copyOfItems = items;
    const filtered = copyOfItems.filter((item) => item.id !== id);
    setItems(filtered);
    localStorage.setItem(key, JSON.stringify(filtered));
  }

  useEffect(() => {
    const data = localStorage.getItem(key);
    const oldData = data ? JSON.parse(data) : [];
    if (oldData.length > 0) {
      setItems(oldData);
      console.log(
        "Effect to get the old data and set it when component first mounts",
      );
    }
  }, []);

  //runs on first mount also instead of depending on newItem
  useEffect(() => {
    const newData = [...items, newItem];
    if (Object.values(newItem).length > 0) {
      setItems((items) => [...items, newItem]);
      localStorage.setItem(key, JSON.stringify(newData));
      console.log("Effect to set state with new data");
    }
  }, [newItem]);

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          newItems: items,
          onClickDelete: handleOnDeleteItem,
        }}
      >
        <Routes>
          <Route index element={<Navigate to="app" />} />
          <Route path="app" element={<Layout />}>
            <Route
              path="codes"
              element={<AddCode onItemChange={handleOnItemChange} />}
            />
            <Route
              path=":id"
              element={<EditCode onEditItem={handleOnEditItem} />}
            />
            <Route path="request" element={<Request />} />
          </Route>
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
    // <div className="content">
    //   <div className="l-side">
    //     <Button content="&#43; New Code" width={200} onClick={handleIsAddFormOpen} />
    //     <ListCodes newItems={items} onCodeClicked={handleCodeClicked} onClickEdit={handleOnEditClicked} onClickDelete={handleOnDeleteItem}/>
    //   </div>
    //   <div className="r-side">
    //     {isAddFormOpen ? (
    //         <div className="form-container">
    //           <AddCode onItemChange={handleOnItemChange} />
    //         </div>
    //     ) : null}
    //     {isEditFormOpen ? (
    //         <div className="form-container">
    //           <EditCode item={itemsEdit} onEditItem={handleOnEditItem}></EditCode>
    //         </div>
    //     ): null}
    //     {response && <Response response={response} isResLoading={isResLoading} error={error} resetError={resetError}/>}
    //         {canDisplayInput && <InputField onSubmitInput={handleUserInput}/>}
    //   </div>
    // </div>
  );
}
