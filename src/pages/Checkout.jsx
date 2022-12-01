import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckoutForm } from "../components/CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CircularProgress from "@material-ui/core/CircularProgress";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(null);

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
    setLoading();
    try {
      const res = await axios.post(process.env.REACT_APP_STRIPE_API);
      setClientSecret(res.data.clientSecret);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress disableShrink />
      </div>
    );
  }

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
