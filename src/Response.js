import Button from "./Button";
import InputField from "./InputField";
export default function Response ({response,isResLoading,error,setError,canDisplayInput,handleUserInput}) {
    return  <>
    <div className="res">
        {error ? (
            <p className="error">
                Oops something broke<span>&#128546;</span>
                <p style={{textAlign : "center"}}>
                    <Button height={50} content="Retry" onClick={setError("")}></Button></p>
            </p>
        ) :  <div className="res-msg-con">
            {isResLoading ? <p className="res-load"><span>⌛</span>@ Loading....</p>
                : <div className="res-msg">
                    {response.MSG?.split("\n").map(msg => <p key={msg}>{msg}</p>)}
                </div>
            }
        </div>}
    </div>
        {canDisplayInput && <InputField onSubmitInput={handleUserInput}/>}
    </>

}