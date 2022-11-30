import { Grid, TextField, InputAdornment, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Person, Phone, LocationOn } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { deliverySchema } from "../../constant/validation";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  margin: {
    marginBottom: "2rem",
  },
}));

const DeliveryForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [provinces, setProvince] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      province: "",
      location: "",
    },
    validationSchema: deliverySchema,
    onSubmit: (values) => {
      navigate("/checkout");
    },
  });

  useEffect(() => {
    fecthProvince();
  }, []);

  const fecthProvince = async () => {
    const { data } = await axios.get("https://vapi.vnappmob.com/api/province/");
    console.log(data);
    setProvince(data.results);
  };

  return (
    <Grid className={classes.container}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          name="name"
          id="name"
          label="Name"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          fullWidth
          className={classes.margin}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          name="phone"
          id="phone"
          label="Phone"
          type="number"
          variant="outlined"
          fullWidth
          className={classes.margin}
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="province"
          select
          label="Province"
          SelectProps={{
            native: true,
          }}
          variant="outlined"
          fullWidth
          className={classes.margin}
          value={formik.values.province}
          onChange={formik.handleChange}
          error={formik.touched.province && Boolean(formik.errors.province)}
          helperText={formik.touched.province && formik.errors.province}
        >
          <option>-None-</option>
          {provinces.map((province) => (
            <option key={province.province_id} value={province.province_name}>
              {province.province_name}
            </option>
          ))}
        </TextField>
        <TextField
          id="location"
          label="Location"
          variant="outlined"
          fullWidth
          className={classes.margin}
          value={formik.values.location}
          onChange={formik.handleChange}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Check out
        </Button>
      </form>
    </Grid>
  );
};

export default DeliveryForm;
