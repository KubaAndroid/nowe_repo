import React, { FormEvent, MutableRefObject, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserOrder } from '../../model/UserOrderModel';
import { UserModel } from '../../model/UserModel';
import styles from './OrderForm.module.css';
import { useOrderContext } from '../../store/OrdersContext';
import { useForm, SubmitHandler } from 'react-hook-form';

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
  const { orderedMenuItems, clearOrder } = useOrderContext()
  const { handleSubmit, register, watch, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();
    
  const onSubmit: SubmitHandler<Inputs> = data => {
    const _user: UserModel = {
      id: Math.floor(Math.random() * (10000000)) + 1,
      first_name: data.fname,
      last_name: data.lname,
      email_address: data.email,
      phone_number: data.phone,
      address_street: data.street,
      address_number: data.streetNumber,
      address_city: data.city,
      address_zip_code: data.zip
    }
    console.log(_user) // TODO: save user to db
    saveUser(_user)
    
    const orderedItemsIds = orderedMenuItems.map(({ id }) => id);

    const _userOrder: UserOrder = {
      user_id: _user.id,
      date: new Date().toString(),
      menu_items: orderedItemsIds
    }
    console.log(_userOrder) // TODO: post order
    postOrder(_userOrder);

  } 

  async function saveUser(user: UserModel) {
        await fetch('http://localhost:5000/users', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
        })
    }

    async function postOrder(order: UserOrder) {
        await fetch('http://localhost:5000/orders', {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json"
        }
        }).then(() => {
          // TODO: toast - order has been placed!
          clearOrder();
        navigate('/', {replace: true})
        })
  }
  
  return (
    <>
     <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.control}>
          <label>First name:</label>
            <input type="text" placeholder="First name" {...register("fname", { required: true, maxLength: 80 })} />
            {errors.fname?.type === 'required' && <p role="alert">First name is required</p>}
        </div>
        
        <div className={styles.control}>
          <label>Last name:</label>
            <input type="text" placeholder="Last name" {...register("lname", { required: true, maxLength: 100 })} />
            {errors.lname?.type === 'required' && <p role="alert">Last name is required</p>}
        </div>

        <div className={styles.control}>
          <label>Email:</label>
            <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
            {errors.email?.type === 'required' && <p role="alert" style={{color: 'red'}}>email is required</p>}
        </div>

        <div className={styles.control}>
          <label>Mobile number:</label>
            <input type="tel" placeholder="Mobile number" {...register("phone", { required: true, minLength: 6, maxLength: 12 })} />
            {errors.phone?.type === 'required' && <p role="alert">phone number is required</p>}
        </div>

        <div className={styles.control}>
          <label>street:</label>
            <input type="text" placeholder="street" {...register("street", { required: true, maxLength: 80 })} />
             {errors.street?.type === 'required' && <p role="alert">street name is required</p>}
        </div>
      
        <div className={styles.control}>
          <label>streetNumber:</label>
            <input type="text" placeholder="streetNumber" {...register("streetNumber", { required: true, maxLength: 80 })} />
            {errors.streetNumber?.type === 'required' && <p role="alert">streetNumber is required</p>}
        </div>

        <div className={styles.control}>
          <label>city:</label>
            <input type="text" placeholder="city" {...register("city", { required: true, maxLength: 80 })} />
            {errors.city?.type === 'required' && <p role="alert">city is required</p>}
        </div>

        <div className={styles.control}>
          <label>zip:</label>
            <input type="text" placeholder="zip" {...register("zip", { required: true, maxLength: 80 })} />
            {errors.zip?.type === 'required' && <p role="alert">zip code is required</p>}
        </div>
      
        <button>Place order</button> 
      </form>
    </div>
    </>
  );
}

export default OrderForm