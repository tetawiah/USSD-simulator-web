import Button from "./Button";

export default function ListCodes({ newItems,onCodeClicked, onClickEdit, onClickDelete}) {


  return (
      <div className="code-side">
            <ul>
              {newItems.map((item) => (
                  <li
                      className="list-code"
                      style={{ listStyleType: "none" }}
                      key={item.id}
                  >
                    <div className="code-btn" onClick={() => onCodeClicked(item)}>
                      {item.ussd}
                    </div>
                    <Button content="✏️" height={50} width={50} onClick={() => onClickEdit(item.id)}></Button>
                    <Button content="&times;" height={50} width={50} onClick={() => onClickDelete(item.id)}> </Button>
                  </li>

              ))}
            </ul>
      </div>
  );
}

