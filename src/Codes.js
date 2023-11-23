import { useEffect, useState } from "react";

export default function Codes({ newData }) {
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleItemClicked = (newUrl) => {
    console.log("url is being set");
    setUrl(newUrl); //if url has already been set how to handle?
  };

  const itemsStored = Object.values(localStorage).map((obj) => JSON.parse(obj));
  useEffect(() => {
    if (itemsStored.length === 0) return;

    setItems(itemsStored);
    console.log("Items effect");
  }, [itemsStored]);

  useEffect(() => {
    if (url) {
      //const payload = {};
      setError("");
      console.log("sendingg request");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(payload),
      })
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [url]);

  return (
    <div className="code-side">
      <ul>
        {items.map((item) => (
          <li
            className="list-code="
            style={{ listStyleType: "none" }}
            key={item.id}
          >
            <div
              className="code-btn"
              onClick={() => handleItemClicked(item.url)}
            >
              {item.ussd}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
