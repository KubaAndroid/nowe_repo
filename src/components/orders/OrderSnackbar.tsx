import { useNavigate } from "react-router-dom";
import { useOrderContext } from "../../store/OrdersContext";
import "./OrderSnackbar.css";


const OrderSnackbar = () => {
  const navigate = useNavigate();
  const {
    clearOrder
  } = useOrderContext()
  return (
    <div className="snackbar">
      <div className="message">The order has been placed!
        <button onClick={() => {
          clearOrder();
          navigate('/', { replace: true });
        }}>OK</button>
      </div>
    </div>
  );
}

export default OrderSnackbar;
