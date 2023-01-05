import { useNavigate } from "react-router-dom";
import "./OrderSnackbar.css";


const OrderSnackbar = () => {
    const navigate = useNavigate();
  return (
    <div
      className="snackbar"
      style={{
        backgroundColor: "#00F593",
        color: "black",
      }}>
          <div className="message">The order has been placed!
            <button onClick={() => navigate('/', {replace: true})}>OK</button>
          </div>
    </div>
  );
}

export default OrderSnackbar;
