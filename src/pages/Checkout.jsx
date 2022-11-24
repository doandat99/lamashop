import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckoutForm } from "../components/CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const Checkout = () => {
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
  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise} key={clientSecret}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
export default Checkout;
