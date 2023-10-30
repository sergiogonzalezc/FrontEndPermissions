import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import parse from "date-fns/parse";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const RegisterNewPermision = () => {
  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      //await register({ email, password });
      console.log("user registered");
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "Email already in use" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    nombreEmpleado: Yup.string().trim().min(1).required(),
    apellidoEmpleado: Yup.string().trim().min(1).required(),
    tipoPermiso: Yup.string().trim().min(1).required(),
    fechaPermiso: Yup.date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "dd-MM-yyyy", new Date());
        return result;
      })
      .typeError("Please enter a valid date")
      .required()
      .min("1969-11-13", "Invalid date. Please change a higher date"),
  });

  return (
    <Box sx={{ mt: 8, maxWidth: 400, mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#444" }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign up
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          isSubmitting,
          errors,
          touched,
          handleBlur,
        }) => (
          <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>
            <TextField
              type="text"
              label="Ingrese email"
              value={values.email}
              onChange={handleChange}
              name="email"
              fullWidth
              sx={{ mb: 3 }}
              id="email"
              placeholder="test@example.com"
              onBlur={handleBlur}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />

            <TextField
              type="password"
              placeholder="Ingrese contraseña"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              id="password"
              label="Ingrese contraseña"
              fullWidth
              sx={{ mb: 3 }}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
            />

            <LoadingButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="contained"
              fullWidth
              sx={{ mb: 3 }}
            >
              Register
            </LoadingButton>

            <Button component={Link} to="/" fullWidth>
              Volver
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterNewPermision;
