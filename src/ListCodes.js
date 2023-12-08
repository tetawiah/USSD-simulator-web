import { useNavigate } from "react-router-dom";

import Button from "./Button";
import RandomDigit from "./utils/RandomDigit";
import { useContext } from "react";
import { AppContext } from "./App";

export default function ListCodes() {
  const navigate = useNavigate();
  const { newItems, onClickDelete } = useContext(AppContext);
  return (
    <div className="code-side">
      <ul className="list-con">
        {newItems.map((item) => (
          <li
            className="list-code"
            style={{ listStyleType: "none" }}
            key={item.id}
          >
            <div
              className="code-btn"
              onClick={() =>
                navigate(`request?id=${item.id}&SID=${RandomDigit()}`)
              }
            >
              {item.ussd}
            </div>
            <Button
              content="✏️"
              height={50}
              width={50}
              onClick={() => navigate(`${item.id}`)}
            ></Button>
            <Button
              content="&times;"
              height={50}
              width={50}
              onClick={() => onClickDelete(item.id)}
            ></Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
