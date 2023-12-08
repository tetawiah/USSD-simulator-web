import Button from "./Button";
import ListCodes from "./ListCodes";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="l-side">
      <Button
        content="&#43; New Code"
        width={200}
        onClick={() => navigate("codes")}
      />
      <ListCodes />
    </div>
  );
}
