import Button from "./Button";
import {useSearchParams} from "react-router-dom";
import {useEffect,useState} from "react";


export default function Response({items,handleUserInput,response,onReceiveResponse}) {
    const [error,setError] = useState("");
    const [searchParams,setSearchParams] = useSearchParams();
    const [isResLoading,setIsResLoading] = useState(false);
    const itemId = searchParams.get("id");
    const sessionID = searchParams.get("SID");


    useEffect(() => {
        const request = items.find(item => item.id = itemId);
        console.log(request);
        console.log('effect to make api call run');
            const payload = {
                USERID : "Spectrum",
                MSISDN : request.phone,
                SESSIONID : sessionID,
                NETWORK : request.operator,
                MSGTYPE : false,
                USERDATA : "1" || request.ussd ,
                //change to userInput
            };
            console.log(payload);
            setError("");
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
                        console.log(response);
                        throw new Error("Request could not be processed");
                    }
                    return response.json()
                })
                .then(data=> {
                    onReceiveResponse(data);
                    setIsResLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error);
                    setIsResLoading(false);
                });
    }, []);
    //Add userInput
    return <div>{response}</div>
    return <div className="res">
        {error ? (
            <p className="error">
                Oops something broke<span>&#128546;</span>
                <p style={{textAlign : "center"}}>
                    <Button height={50} content="Retry" onClick={setError("")}></Button></p>
            </p>
        ) :  <div className="res-msg-con">
            {isResLoading ? <p className="res-load"><span>⌛</span>@ Loading....</p>
                : <div className="res-msg">
                    {response.MSG.split("\n").map(msg => <p>{msg}</p>)}
                </div>
            }
        </div>}

    </div>

}

