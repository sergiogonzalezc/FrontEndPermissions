import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import parse from "date-fns/parse";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import { ValidatePermissionData } from "../api/permissionApi";
import AnimatedModal from "../Components/AnimatedModal";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const ValidatePermission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [updatedOk, setUpdatedOk] = useState(false);

  const initialDataPermision = [];

  initialDataPermision.push({
    id: 1,
    descripcion: "User",
  });

  const [permissionType, setPermissionType] = useState();
  const [permissionTypeList, setPermissionTypeList] = useState([]);

  const [isOpenOkModal, setIsOpenOkModal] = useState(false);
  const handleOpenOkModal = () => setIsOpenOkModal(true);
  const handleCloseOkModal = () => setIsOpenOkModal(false);

  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const handleOpenErrorModal = () => setIsOpenErrorModal(true);
  const handleCloseErrorModal = () => setIsOpenErrorModal(false);

  const onSubmit = async (
    { nombreEmpleado, apellidoEmpleado },
    { setSubmitting, setErrors, resetForm }
  ) => {
    console.log("inicio validation...", nombreEmpleado, apellidoEmpleado);

    try {
      setIsLoading(true);

      let inputData = {
        nombreEmpleado: nombreEmpleado,
        apellidoEmpleado: apellidoEmpleado,
      };

      ValidatePermissionData(inputData).then((response) => {
        console.log("request result", response);

        if (response.success) {
          // permision OK
          setIsOpenErrorModal(false);
          setIsLoading(false);

          resetForm();

          handleOpenOkModal(); // show ok
        } else {
          if (response) {
            // Permission not ok or not found
            setIsLoading(false);
            handleOpenErrorModal(); // show error
          }
        }
      });

      setIsLoading(false);

      resetForm();
    } catch (error) {
      console.log(error);
      //console.log(error.message);
      if (error.code === "Error_generic") {
        setErrors({ nombreEmpleado: "Error_generic" });
      }
    } finally {
      setSubmitting(false);
    }
  };



  const validationSchema = Yup.object().shape({
    nombreEmpleado: Yup.string().trim().min(1).required(),
    apellidoEmpleado: Yup.string().trim().min(1).required(),
  });
    
  return (
    <>
      <AnimatedModal
        title={"Permission exists!"}
        description={"The permision was found!"}
        isOpen={isOpenOkModal}
        handleClose={handleCloseOkModal}
        success={true}
      ></AnimatedModal>
      <AnimatedModal
        title={"Permission does not exists or was not found"}
        description={"Permission does not exists or was not found"}
        isOpen={isOpenErrorModal}
        handleClose={handleCloseErrorModal}
        success={false}
      ></AnimatedModal>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ mt: 8, maxWidth: 400, mx: "auto", textAlign: "center" }}>
        <Avatar sx={{ mx: "auto", bgcolor: "#444" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Validate Permission
        </Typography>

        <Formik
          initialValues={{ nombreEmpleado: "", apellidoEmpleado: "" }}
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
                label="Nombre/Name"
                value={values.nombreEmpleado}
                onChange={handleChange}
                name="nombreEmpleado"
                fullWidth
                sx={{ mb: 3 }}
                id="nombreEmpleado"
                placeholder="John"
                onBlur={handleBlur}
                error={errors.nombreEmpleado && touched.nombreEmpleado}
                helperText={
                  errors.nombreEmpleado &&
                  touched.nombreEmpleado &&
                  errors.nombreEmpleado
                }
              />

              <TextField
                type="text"
                label="Apellido/Last name"
                value={values.apellidoEmpleado}
                onChange={handleChange}
                name="apellidoEmpleado"
                fullWidth
                sx={{ mb: 3 }}
                id="apellidoEmpleado"
                placeholder="Snow"
                onBlur={handleBlur}
                error={errors.apellidoEmpleado && touched.apellidoEmpleado}
                helperText={
                  errors.apellidoEmpleado &&
                  touched.apellidoEmpleado &&
                  errors.apellidoEmpleado
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
                Validate
              </LoadingButton>

              <Button component={Link} to="/" fullWidth>
                Back to List 
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ValidatePermission;
