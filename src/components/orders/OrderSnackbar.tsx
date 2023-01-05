import { useNavigate } from "react-router-dom";
import "./OrderSnackbar.css";


const OrderSnackbar = () => {
    const navigate = useNavigate();
  return (
    <div className="snackbar">
      <div className="message">The order has been placed!
        {/* TODO: add emptying the order cart */}
        <button onClick={() => navigate('/', {replace: true})}>OK</button>
      </div>
    </div>
  );
}

export default OrderSnackbar;
