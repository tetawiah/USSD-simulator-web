import Button from "./Button";

export default function Response({response,isResLoading,error,resetError}) {
    return <div className="res">
        {error ? (
            <p className="error">
                Oops something broke<span>&#128546;</span>
                <p style={{textAlign : "center"}}>
                    <Button height={50} content="Retry" onClick={resetError}></Button></p>
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