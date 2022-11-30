import React from "react";
import {
  Button,
  TextField,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import SaveIcon from "@material-ui/icons/Save";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useFormik } from "formik";
import { editCategorySchema } from "../../../constant/validation";
import { update } from "../../../api/category";
import toastr from "toastr";

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

const FormCategory = (props) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: props.data.name,
    },
    validationSchema: editCategorySchema,
    onSubmit: async (values, onSubmitProps) => {
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
      const updateCategory = await update(props.data.id, values);
      if (updateCategory) {
        toastr.success("Update category is success");
      }
    },
  });
  return (
    <div>
      <div>
        <p className={classes.title}>Edit Category</p>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className={classes.input}
            name="name"
            id="name"
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
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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

export default FormCategory;
