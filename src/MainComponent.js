import {Outlet} from "react-router-dom";
import AddCode from "./AddCode";
export default function MainComponent() {
    return (
        <div className="r-side">
        <Outlet/>
    </div>
    )
}