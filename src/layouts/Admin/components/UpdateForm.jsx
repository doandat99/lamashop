import React from "react";
// import toastr from "toastr";
import {
  Button,
  TextField,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SortIcon from "@material-ui/icons/Sort";
import SaveIcon from "@material-ui/icons/Save";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DescriptionIcon from "@material-ui/icons/Description";
// import uploadImage from "../../../api/uploadimage";
import { useFormik } from "formik";
import { updateProductSchema } from "../../../constant/validation";
import PreviewImage from "./PreviewImage";
import { update } from "../../../api/product";
import toastr from "toastr";
import uploadImage from "../../../api/uploadimage";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    padding: "2rem 0",
    textTransform: "uppercase",
  },
  input: {
    paddingBottom: "2rem",
  },
  bottom: {
    display: "flex",
    justifyContent: "end",
  },
  image: {
    height: "50px",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const UpdateForm = (props) => {
  const { title, image, category, description, quantity, price } = props.data;
  const id = props.data.id;

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title,
      image: "",
      price,
      quantity,
      category,
      description,
    },
    validationSchema: updateProductSchema,
    onSubmit: async (values) => {
      const { title, image, category, description, quantity, price } = values;
      if (image) {
        const url = await uploadImage(image);
        const data = {
          title,
          image: url,
          category,
          description,
          quantity,
          price,
        };
        const updateData = await update(id, data);
        if (updateData) {
          toastr.success("Update product is success");
        } else {
          toastr.error("Update product is error");
        }
      } else {
        const data = {
          title,
          category,
          image: props.data.image,
          description,
          quantity,
          price,
        };
        const updateData = await update(id, data);
        if (updateData) {
          toastr.success("Update product is success");
        } else {
          toastr.error("Update product is error");
        }
      }
    },
  });
  return (
    <div>
      <div>
        <p className={classes.title}>Edit product</p>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className={classes.input}
            name="title"
            id="title"
            type="text"
            label="Title"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TextFieldsIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <div className={classes.box}>
            <TextField
              className={classes.input}
              name="upload"
              id="upload"
              type="file"
              onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
            <div>
              {formik.values.image ? (
                <PreviewImage file={formik.values.image} />
              ) : (
                <img className={classes.image} src={image} alt="" />
              )}
            </div>
          </div>
          <TextField
            className={classes.input}
            name="price"
            id="price"
            type="number"
            label="Price"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            className={classes.input}
            name="quantity"
            id="quantity"
            type="number"
            label="Quantity"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SortIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <TextField
            id="category"
            select
            label="Category"
            SelectProps={{
              native: true,
            }}
            variant="outlined"
            fullWidth
            className={classes.input}
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          >
            <option>-None-</option>
            {[
              "electronics",
              "jewelery",
              "men's clothing",
              "women's clothing",
            ].map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </TextField>
          <TextField
            className={classes.input}
            name="description"
            id="description"
            type="text"
            label="Description"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              ),
            }}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <div className={classes.bottom}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              type="submit"
            >
              Update
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              startIcon={<HighlightOffIcon />}
              onClick={props.onClose}
            >
              CLOSE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
