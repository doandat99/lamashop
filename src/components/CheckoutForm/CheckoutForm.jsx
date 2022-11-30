import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import {
  card_error,
  processing,
  requires_payment_method,
  succeeded,
  validation_error,
} from "../../utils/const";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyle = makeStyles((theme) => ({
  button: {
    width: "100%",
    marginTop: "2rem",
    padding: "0.5rem 0",
    cursor: "pointer",
    backgroundColor: "#3f51b5",
    color: "#fff",
    borderRadius: "4px",
    border: "none",
  },
  container: {
    width: "50%",
    margin: "6rem auto",
    "@media (max-width:768px)": {
      width: "90%",
    },
    "@media (max-width:425px)": {
      width: "80%",
    },
  },
}));

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyle();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      process.env.REACT_APP_STRIPE_CLIENT_SERET
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case succeeded:
          setMessage("Payment succeeded!");
          break;
        case processing:
          setMessage("Your payment is processing.");
          break;
        case requires_payment_method:
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.REACT_APP_URL,
      },
    });

    if (error.type === card_error || error.type === validation_error) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className={classes.container}>
      {isLoading ? (
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className={classes.button}
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner">
                  Loading....
                </div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
