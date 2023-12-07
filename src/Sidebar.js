import Button from "./Button";
import ListCodes from "./ListCodes";
import {useContext} from "react";
import {AppContext} from "./App";
import {useNavigate} from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const {items,handleCodeClicked,handleOnEditClicked,handleOnDeleteItem} = useContext(AppContext);
    return (
        <div className="l-side">
            <Button content="&#43; New Code" width={200} onClick= {() => navigate("create")} />
            <ListCodes newItems={items} onCodeClicked={handleCodeClicked} onClickEdit={handleOnEditClicked} onClickDelete={handleOnDeleteItem}/>
        </div>
    )
}