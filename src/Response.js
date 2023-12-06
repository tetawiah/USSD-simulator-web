export default function Response({response}) {
    return <div className="res">
        <div className="res-msg-con">
            <pre className="res-msg">{response.MSG}</pre>
        </div>
        </div>

}