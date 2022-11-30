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
import { addCategorySchema } from "../../../constant/validation";
import { add } from "../../../api/category";
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
}));

const AddCategory = ({ handleClose }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: addCategorySchema,
    onSubmit: async (values, onSubmitProps) => {
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
      const postCategory = await add(values);
      if (postCategory) {
        toastr.success("Add new category is success");
      }
    },
  });

  return (
    <div>
      <div>
        <p className={classes.title}>Add new category</p>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className={classes.input}
            name="name"
            id="name"
            type="text"
            label="name"
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
              SAVE
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              startIcon={<HighlightOffIcon />}
              onClick={handleClose}
            >
              CLOSE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
