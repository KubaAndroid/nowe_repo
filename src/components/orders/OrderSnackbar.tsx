import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useOrderContext } from "../../store/OrdersContext";
import "./OrderSnackbar.css";

const Message = styled.div`
  flex: 80%;
  font-weight: bold;
`

const OkButton = styled.button`
  margin: 15px;
`

const fadeIn = keyframes`
  0% {
    /* bottom: 0; */
    opacity: 0;
  }
  25% {
    /* bottom: 0.5; */
    opacity: 0.5;
  }
  50% {
    /* bottom: 1; */
    opacity: 1;
  }
  100% {
    /* bottom: 0; */
    opacity: 1;
  }
`

/**
const SnackbarLayout2 = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 100px;
  border-radius: 18px;
  border: 1px solid #b4d6a5;
  background-color: #a2cc8e;
  padding: 15px;
  display: flex;
  align-items: center;
  text-align: center;

  animation: ${fadeIn} 1.5s, ${fadeOut} 1.5s;
`
 */


const SnackbarLayout = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 0rem;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  border: 1px solid #b4d6a5;
  background-color: #a2cc8e;
  padding: 8px;
  padding-left: 50px;
  padding-right: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: ${fadeIn};
  animation-duration: 5s;
`;
/* animation: ${fadeIn} 2.5s, ${fadeOut} 1.5s 1; */

const OrderSnackbar = () => {
  const navigate = useNavigate();
  const {
    clearOrder
  } = useOrderContext()
  return (
    <SnackbarLayout>
      <Message>The order has been placed!
        <OkButton
          onClick={() => {
          clearOrder();
          navigate('/', { replace: true });
          }}>OK
        </OkButton>
      </Message>
    </SnackbarLayout>
  );
}

export default OrderSnackbar;
