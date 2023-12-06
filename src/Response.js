export default function Response({response}) {
    return <div className="res">
        <div className="res-msg-con">
            {isResLoading ? <p className="res-load"><span>⌛</span>@ Loading....</p>
                : <div className="res-msg">
                    {response.MSG.split("\n").map(msg => <p>{msg}</p>)}
                </div>
            }
        </div>
        </div>

}