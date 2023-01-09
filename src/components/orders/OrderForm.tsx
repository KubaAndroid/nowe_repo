import React, { FormEvent, MutableRefObject, useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserOrder } from '../../model/UserOrderModel';
import { UserModel } from '../../model/UserModel';
import styles from './OrderForm.module.css';
import { useOrderContext } from '../../store/OrdersContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import OrderSnackbar from './OrderSnackbar';

type Inputs = {
  fname: string,
  lname: string,
  phone: string,
  email: string,
  street: string,
  streetNumber: string,
  city: string,
  zip: string,
};

function OrderForm() {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState<Boolean>(false)
  const { orderedMenuItems, clearOrder, clientsList, setClientsList, ordersList, setOrdersList } = useOrderContext()
  const { handleSubmit, register, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();
    
  const onSubmit: SubmitHandler<Inputs> = data => {
    const _user: UserModel = {
      id: Math.floor(Math.random() * (10000000)) + 1,
      firstName: data.fname,
      lastName: data.lname,
      emailAddress: data.email,
      phoneNumber: data.phone,
      addressStreet: data.street,
      addressNumber: data.streetNumber,
      addressCity: data.city,
      addressZipCode: data.zip
    }
    saveUser(_user)
    
    const orderedItemsIds = orderedMenuItems.map(({ id }) => id);

    const _userOrder: UserOrder = {
      userId: _user.id,
      date: new Date().toUTCString(),
      menuItems: orderedItemsIds
    }
    postOrder(_userOrder);
  } 

  async function saveUser(user: UserModel) {
        await fetch('http://localhost:5000/users', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
        }).then(() => setClientsList([...clientsList, user]))
    }

    async function postOrder(order: UserOrder) {
        await fetch('http://localhost:5000/orders', {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
              "Content-Type": "application/json"
          }
        }).then(() => {
        // setOrdersList([...ordersList, order])
        showSnack()
          // clearOrder();
          // navigate('/', {replace: true})
        })
  }

  const showSnack = () => {
    setIsSnackbarVisible(true)
    setTimeout(() => {
      setIsSnackbarVisible(false);
      clearOrder();
      navigate('/', { replace: true });
      }, 3000);
  }
  
  return (
    <>
     <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.control}>
          <label>First name:</label>
            <input type="text" placeholder="First name" {...register("fname", { required: true, maxLength: 80 })} />
            {errors.fname?.type === 'required' && <p role="alert" style={{color: 'red'}}>First name is required</p>}
          </div>

        <div className={styles.control}>
          <label>Last name:</label>
            <input type="text" placeholder="Last name" {...register("lname", { required: true, maxLength: 100 })} />
            {errors.lname?.type === 'required' && <p role="alert" style={{color: 'red'}}>Last name is required</p>}
        </div>

        <div className={styles.control}>
          <label>Email:</label>
            <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
            {errors.email?.type === 'required' && <p role="alert" style={{color: 'red'}}>email address is required</p>}
        </div>

        <div className={styles.control}>
          <label>Mobile number:</label>
            <input type="tel" placeholder="Mobile number" {...register("phone", { required: true, minLength: 7, maxLength: 12 })} />
            {errors.phone?.type === 'required' && <p role="alert" style={{color: 'red'}}>phone number is required</p>}
        </div>

        <div className={styles.control}>
          <label>Street:</label>
            <input type="text" placeholder="street" {...register("street", { required: true, maxLength: 80 })} />
             {errors.street?.type === 'required' && <p role="alert" style={{color: 'red'}}>street name is required</p>}
        </div>
      
        <div className={styles.control}>
          <label>Street number:</label>
            <input type="text" placeholder="street number" {...register("streetNumber", { required: true, maxLength: 80 })} />
            {errors.streetNumber?.type === 'required' && <p role="alert" style={{color: 'red'}}>street number is required</p>}
        </div>

        <div className={styles.control}>
          <label>City:</label>
            <input type="text" placeholder="city" {...register("city", { required: true, maxLength: 80 })} />
            {errors.city?.type === 'required' && <p role="alert" style={{color: 'red'}}>city is required</p>}
        </div>

        <div className={styles.control}>
          <label>Zip code:</label>
            <input type="text" placeholder="zip code" {...register("zip", { required: true, maxLength: 80 })} />
            {errors.zip?.type === 'required' && <p role="alert" style={{color: 'red'}}>zip code is required</p>}
        </div>
        <button>Place order</button>
        </form>
         {/* <button onClick={() => showSnack()}>click</button> */}
        {isSnackbarVisible && <OrderSnackbar />}
      </div>
      
    </>
  );
}

export default OrderForm