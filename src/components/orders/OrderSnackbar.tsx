import "./OrderSnackbar.css";



const OrderSnackbar = () => {

  return (
    <div
      className="snackbar"
      style={{
        backgroundColor: "#00F593",
        color: "black",
      }}
    >

          <div className="message">The order has been placed!
              <button>OK</button>
          </div>
    </div>
  );
}

export default OrderSnackbar;
