import { useEffect, useState } from "react";

export default function Codes({ newItems }) {
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleItemClicked = (newUrl) => {
    console.log("url is being set");
    setUrl(newUrl); //if url has already been set how to handle?
  };

  useEffect(() => {
    setItems(newItems);
    console.log("Items effect");
  }, [newItems]);

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
          console.log(error);
          setError(error);
        });
    }
  }, [url]);

  return (
    <div className="code-side">
      {error ? (
        <p className="error">
          Oops something broke<span>&#128546;</span>
        </p>
      ) : (
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
      )}
    </div>
  );
}
