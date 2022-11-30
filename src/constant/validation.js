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

export const deliverySchema = Yup.object({
  name: Yup.string()
    .required("Invalid name")
    .min(5, "You name must be least 5 charagers")
    .max(20, "You name must be under 20 charagers"),

  phone: Yup.string()
    .required("Invalid phonenumber")
    .matches(regexPhone, "Must be a valid phone number"),

  province: Yup.string().required("Invalid province"),

  location: Yup.string().required("Invalid location"),
});

export const addProductSchema = Yup.object({
  title: Yup.string()
    .required("Invalid name")
    .min(5, "You name must be least 5 charagers")
    .max(20, "You name must be under 20 charagers"),
  image: Yup.mixed().required("Required....!"),

  price: Yup.number().required("Invalid price"),

  category: Yup.string().required("Invalid category"),

  description: Yup.string().required("Invalid description"),

  quantity: Yup.number().required("Invalid quantity"),
});

export const updateProductSchema = Yup.object({
  title: Yup.string()
    .required("Invalid name")
    .min(5, "You name must be least 5 charagers")
    .max(20, "You name must be under 20 charagers"),

  price: Yup.number().required("Invalid price"),

  category: Yup.string().required("Invalid category"),

  description: Yup.string().required("Invalid description"),

  quantity: Yup.number().required("Invalid quantity"),
});

export const addCategorySchema = Yup.object({
  name: Yup.string()
    .required("Invalid name")
    .min(5, "You name must be least 5 charagers")
    .max(50, "You name must be under 20 charagers"),
});

export const editCategorySchema = Yup.object({
  title: Yup.string()
    .required("Invalid name")
    .min(5, "You name must be least 5 charagers")
    .max(50, "You name must be under 20 charagers"),
});
