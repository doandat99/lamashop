import * as Yup from "yup";

const regexPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const regexPassword =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[\S]{8,}$/;

export const signupSchema = Yup.object({
  username: Yup.string()
    .min(5, "You name must be least 5 charagers")
    .max(25, "You name must be under 25 charagers")
    .required("You must fill in this selection!"),

  email: Yup.string().required("Required email").email("Invalid email"),

  phonenumber: Yup.string()
    .required("Invalid phonenumber")
    .matches(regexPhone, "Must be a valid phone number"),

  password: Yup.string()
    .required("Invalid password")
    .matches(
      regexPassword,
      "Password miximum 8,at least one uppercase letter, one lowercase letter and one number,speacial character"
    ),
  confirm_password: Yup.string()
    .required("Invalid confirmpassword")
    .oneOf([Yup.ref("password")], "Password must match"),
});

export const signinSchema = Yup.object({
  email: Yup.string().required("Required email").email("Invalid email"),

  password: Yup.string()
    .required("Invalid password")
    .matches(
      regexPassword,
      "Password miximum 8,at least one uppercase letter, one lowercase letter and one number,speacial character"
    ),
});

export const contactSchema = Yup.object({
  name: Yup.string()
    .required("Invalid name")
    .min(5, "You name must be least 5 charagers")
    .max(20, "You name must be under 20 charagers"),

  email: Yup.string().required("Please enter email").email("Invalid email"),

  phone: Yup.string()
    .required("Invalid phonenumber")
    .matches(regexPhone, "Must be a valid phone number"),

  messages: Yup.string().required("Invalid message"),
});
