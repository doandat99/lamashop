import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import { CheckoutForm } from "../components/CheckoutForm/CheckoutForm";
import { useSelector } from "react-redux";
import { cartSelector } from "../redux/selector";
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const useStyle = makeStyles((theme) => ({
  container: {
    width: "80vw",
    display: "flex",
    margin: "6rem auto",
    justifyContent: "space-between",
  },
  image: {
    width: "3rem",
    height: "4rem",
  },
  form: {
    width: "45%",
  },
  product: {
    width: "45%",
    marginTop: "3.5rem",
  },
  item: {
    display: "flex",
    marginBottom: "2rem",
  },
  marginlef: {
    marginLeft: "2rem",
  },
  marginbottom: {
    marginBottom: "0.5rem",
  },
}));

export const Checkout = () => {
  const classes = useStyle();

  const cart = useSelector(cartSelector);

  const [clientSecret, setClientSecret] = useState("");

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    fetchStripe();
  }, []);

  const fetchStripe = async () => {
    const res = await axios.post(process.env.REACT_APP_STRIPE_API);
    setClientSecret(res.data.clientSecret);
  };

  const total = cart.reduce((sum, curr) => {
    return sum + curr.price * curr.quantity;
  }, 0);

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise} key={clientSecret}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
      <div className={classes.product}>
        {cart.map((item, index) => (
          <div key={index} className={classes.item}>
            <img className={classes.image} src={item.image} alt="" />
            <div className={classes.marginlef}>
              <p className={classes.marginbottom}>{item.title}</p>
              <p className={classes.marginbottom}>quantity: {item.quantity}</p>
              <p className={classes.marginbottom}>price: {item.price} $</p>
            </div>
          </div>
        ))}
        <div>
          {cart.length === 0 ? "" : <p>Total :{total.toFixed(2)} $ </p>}
        </div>
      </div>
    </div>
  );
};
