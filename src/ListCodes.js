import { useEffect, useState } from "react";
import RandomDigit from "./utils/RandomDigit";

export default function ListCodes({ newItems,onCodeClicked,error}) {


  return (
    <div className="code-side">
      {error ? (
        <p className="error">
          Oops something broke<span>&#128546;</span>
        </p>
      ) : (
        <ul>
          {newItems.map((item) => (
            <li
              className="list-code="
              style={{ listStyleType: "none" }}
              key={item.id}
            >
              <div className="code-btn" onClick={() => onCodeClicked(item)}>
                {item.ussd}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
