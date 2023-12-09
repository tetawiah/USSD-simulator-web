import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Response from "./Response";
import { retrieveData, compareID } from "./helpers/Helpers";

export default function Request() {
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionID = searchParams.get("SID");
  const itemId = searchParams.get("id");
  const [isResLoading, setIsResLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const [canDisplayInput, setCanDisplayInput] = useState(true);
  // const [sessionId, setSessionId] = useState(() => sessionID);

  function handleUserInput(input) {
    setUserInput(input);
  }

  function handleSetResponse(data) {
    if (data.MSGTYPE === false) {
      setCanDisplayInput(false);
    }
    setResponse(data);
  }

  useEffect(() => {
    console.log("user entered" + userInput);
    const _items = retrieveData("ussd_data");
    const request = compareID(_items, itemId);
    console.log(request);
    console.log("effect to make api call");
    const payload = {
      USERID: "Spectrum",
      MSISDN: request.phone,
      SESSIONID: sessionID,
      // SESSIONID: sessionId,
      NETWORK: request.operator,
      MSGTYPE: false,
      USERDATA: userInput.trim() || request.ussd,
    };
    console.log(payload);
    setError("");
    console.log("sendingg request");
    setIsResLoading(true);
    fetch(request.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Request could not be processed");
        }
        return response.json();
      })
      .then((data) => {
        handleSetResponse(data);
        setIsResLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsResLoading(false);
      });
  }, [itemId, userInput, sessionID]);

  return (
    <Response
      response={response}
      isResLoading={isResLoading}
      error={error}
      setError={setError}
      canDisplayInput={canDisplayInput}
      handleUserInput={handleUserInput}
    />
  );
}
