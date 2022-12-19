import React, { FormEvent, MutableRefObject, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserOrder } from '../../model/UserOrderModel';
import { UserModel } from '../../model/UserModel';
import OrderContext from '../../store/order-context';
import styles from './OrderForm.module.css';

function OrderForm() {
    const ordersContext = useContext(OrderContext);
    const navigate = useNavigate();
    
    const firstNameInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const lastNameInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const addressStreetNameInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const addressStreetNumberInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const addressCityInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const addressZipCodeInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const phoneNumberInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const emailAddressInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
   

    function submitOrder(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const enteredUserFirstName = firstNameInputRef.current?.value
        const enteredUserLastName = lastNameInputRef.current?.value
        const enteredUserStreetName = addressStreetNameInputRef.current?.value
        const enteredUserStreetNumber = addressStreetNumberInputRef.current?.value
        const enteredUserCityNumber = addressCityInputRef.current?.value
        const enteredUserZipCode = addressZipCodeInputRef.current?.value
        const enteredUserPhoneNumber = phoneNumberInputRef.current?.value
        const enteredUserEmailAddress = emailAddressInputRef.current?.value

        const _user: UserModel = {
            id: Math.floor(Math.random() * (10000000)) + 1,
            first_name: enteredUserFirstName,
            last_name: enteredUserLastName,
            email_address: enteredUserEmailAddress,
            phone_number: enteredUserPhoneNumber,
            address_street: enteredUserStreetName,
            address_number: enteredUserStreetNumber,
            address_city: enteredUserCityNumber,
            address_zip_code: enteredUserZipCode
        }

        const orderedItemsIds = ordersContext.order.map(({ id }) => id);

        const _userOrder: UserOrder = {
            order_id: Math.floor(Math.random() * (10000000)) + 1,
            user_id: _user.id,
            date: new Date().toString(),
            menu_items: orderedItemsIds
          }
        
        console.log(_user) // TODO: save user to db
        console.log(_userOrder) // TODO: post order
        postOrder(_userOrder);
    }

    async function postOrder(order: UserOrder) {
        await fetch('http://localhost:5000/orders', {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json"
        }
        }).then(() => {
            // TODO: context - clear the order
        navigate('/', {replace: true})
        })
    }
   
  return (
      <div>
          <h1>Order confirmation</h1>
          <div>
              <form className={styles.form} onSubmit={ submitOrder }>
                <div className={styles.control}>
                    <label htmlFor='fName'>First name:</label>
                    <input type='text' required id='fName' placeholder='first name' ref={firstNameInputRef} />
                </div>
                <div className={styles.control}>
                    <label htmlFor='lName'>Last name:</label>
                    <input type='text' required id='lName' placeholder='last name' ref={lastNameInputRef} />
                  </div>
                  <div className={styles.control}>
                    <label htmlFor='street'>Street:</label>
                    <input type='text' required id='street' placeholder='street name' ref={addressStreetNameInputRef} />
                  </div>
                  <div className={styles.control}>
                    <label htmlFor='sNumber'>Street number:</label>
                    <input type='text' required id='sNumber' placeholder='street number' ref={addressStreetNumberInputRef} />
                  </div>
                  <div className={styles.control}>
                    <label htmlFor='city'>City:</label>
                    <input type='text' required id='city' placeholder='city' ref={addressCityInputRef} />
                  </div>
                  <div className={styles.control}>
                    <label htmlFor='zip'>Zip code:</label>
                    <input type='text' required id='zip' placeholder='zip' ref={addressZipCodeInputRef} />
                  </div>
                  <div className={styles.control}>
                    <label htmlFor='phone'>Phone number:</label>
                    <input type='text' required id='phone' placeholder='phone' ref={phoneNumberInputRef} />
                  </div>
                  <div className={styles.control}>
                    <label htmlFor='email'>Email address:</label>
                    <input type='text' required id='email' placeholder='email' ref={emailAddressInputRef} />
                </div>
                    <button>Place order</button> 
              </form>
          </div>
    </div>
  )
}

export default OrderForm