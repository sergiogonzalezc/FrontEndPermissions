import { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  CreateNewPermissionData,
  GetAllPermissionTypesData,
} from "../api/permissionApi";

import * as Yup from "yup";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import parse from "date-fns/parse";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AnimatedModal from "../Components/AnimatedModal";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const RegisterNewPermision = () => {
  const navigate = useNavigate();

  const [permissionValues, setPermissionValues] = useState({
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermiso: 1,
    //fechaPermiso: Date.now(),
  });

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

  const [propsModalError, setPropsModalError] = useState({
    title: undefined,
    text: undefined,
  });

  useEffect(() => {
    getAllPermissionTypes();
  }, []);

  const getAllPermissionTypes = async () => {
    setIsLoading(true);
    GetAllPermissionTypesData().then((response) => {
      //console.log("list types", response);

      if (response?.ok && response.ok === false) {
        // setPropsModalError({
        //   title: "Error loading API",
        //   text: "Please try again.",
        // });

        setIsLoading(false);
        handleOpenErrorModal(); // show error
      } else {
        if (response) {
          //console.log("list types OK", response);

          setPermissionTypeList(response);
        }

        //setOpenErrorModal(false);
        setIsLoading(false);
      }
    });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const onSubmit = async (
    { nombreEmpleado, apellidoEmpleado, tipoPermiso, fechaPermiso },
    { setSubmitting, setErrors, resetForm }
  ) => {
    console.log("init creation...", nombreEmpleado, tipoPermiso, fechaPermiso);

    try {
      setIsLoading(true);
      let inputData = {
        nombreEmpleado: nombreEmpleado,
        apellidoEmpleado: apellidoEmpleado,
        tipoPermiso: tipoPermiso,
        fechaPermiso: fechaPermiso,
      };

      CreateNewPermissionData(inputData).then((response) => {
        console.log("respuesta api", response);

        if (!response.success) {
           setPropsModalError({
             title: "Error",
             text: response.errorMessage,
           });

          setIsLoading(false);

          handleOpenErrorModal(); // show error
          //setOpenOkModal(false);
        } else {
          if (response) {
            //console.log("modify read Ok", response);

            //setOpenErrorModal(false);
            setIsLoading(false);

            // clean values
            setPermissionValues({
              nombreEmpleado: "",
              apellidoEmpleado: "",
              TipoPermiso: 1,
              //fechaPermiso: Date.now(),
            });

            resetForm();

            handleOpenOkModal();
            // setOpenConfirmation(true); // show modal Ok
          }
        }
      });

      setIsLoading(false);     
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
    nombreEmpleado: Yup.string().trim().min(1).max(49).required(),
    apellidoEmpleado: Yup.string().trim().min(1).max(49).required(),
    tipoPermiso: Yup.string().trim().required(),
    //fechaPermiso: Yup.date().required()
    // .transform(function (value, originalValue) {
    //   if (this.isType(value)) {
    //     return value;
    //   }
    //   const result = parse(originalValue, "DD/MM/YYYY", new Date());
    //   return result;
    // })
    // .typeError("Please enter a valid date")
    // .min("1969-11-13", "Invalid date. Please change a higher date"),
  });

  const initialValues = {
    //id: 0,
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermiso: 1,
    // tipoPermisoDesc: "",
    //fechaPermiso: Date.now(),
  };

  return (
    <>
      <AnimatedModal
        title={"New Permission create successfully!"}
        description={"The permision was created!"}
        isOpen={isOpenOkModal}
        handleClose={handleCloseOkModal}
        customProps = {propsModalError}
        success={true}
      ></AnimatedModal>
      <AnimatedModal
        title={"The permission could not be modified"}
        description={
          "The permission could not be modified. Please check de data or try again later"
        }
        isOpen={isOpenErrorModal}
        handleClose={handleCloseErrorModal}
        customProps = {propsModalError}
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
          Create New Permission
        </Typography>

        <Formik
          initialValues={permissionValues || initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
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
            <Box onSubmit={handleSubmit} component="form" sx={4}>
              <Grid item xs={12} md={12} mt={4}>
                <Item>
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

                  <Autocomplete
                    isOptionEqualToValue={(option, value) =>
                      option.valueOf === value.valueOf
                    }
                    onChange={(event, value) => {
                      console.log("setting type: ", value);
                      const { id } = value;
                      values.tipoPermiso = id;
                      setPermissionType(value);
                    }}
                    value={permissionType || null}
                    options={permissionTypeList}
                    getOptionLabel={(options) => `${options.descripcion}`}
                    disablePortal
                    id="tipoPermiso"
                    sx={{ mb: 3 }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Permission Type"
                        variant="standard"
                      />
                    )}
                    error={errors.tipoPermiso && touched.tipoPermiso}
                    helperText={
                      errors.tipoPermiso &&
                      touched.tipoPermiso &&
                      errors.tipoPermiso
                    }
                  />

                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="es-mx"
                  >
                    <DatePicker
                      label="Fecha Permiso/Permission Date"                      
                      value={values.fechaPermiso}
                      //inputFormat="DD/MM/YYYY"
                      name="fechaPermiso"
                      id="fechaPermiso"
                      onChange={(value, x) => {
                        console.log(
                          "selected permission Date: ",
                          JSON.stringify(value)
                        );
                        values.fechaPermiso = dayjs(value);
                      }}
                      fullWidth
                      views={["year", "month", "day"]}
                      sx={{ mb: 3 }}
                    />
                  </LocalizationProvider>
                </Item>
              </Grid>
              {/* Buttons */}

              <Grid container spacing={2}>
              <Grid item xs={6} md={6} mt={4}>
                <Item>
                  <LoadingButton
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    variant="contained"
                    fullWidth
                  >
                    Create New Permission
                  </LoadingButton>
                </Item>
              </Grid>
              <Grid item xs={6} md={6} mt={4}>
                <Item>
                  <Button component={Link} to="/" fullWidth>
                    Back to List
                  </Button>
                </Item>
              </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default RegisterNewPermision;
