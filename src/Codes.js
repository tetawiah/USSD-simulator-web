import { useEffect, useState } from "react";

export default function Codes({ newItems }) {
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleItemClicked = (item) => {
    console.log("url is being set");
    setUrl(item.url); //if url has already been set how to handle?
  };

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
          {newItems.map((item) => (
            <li
              className="list-code="
              style={{ listStyleType: "none" }}
              key={item.id}
            >
              <div className="code-btn" onClick={() => handleItemClicked(item)}>
                {item.ussd}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
