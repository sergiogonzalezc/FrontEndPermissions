import { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  GetPermissionByIdData,
  ModifyPermissionData,
  GetAllPermissionTypesData,
  GetAllPermissionTypeByIdData,
} from "../api/permissionApi";

import * as Yup from "yup";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import parse from "date-fns/parse";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AnimatedModal from "../Components/AnimatedModal";

const ModifyPermission = ({ idToModify, idGuiid, setUpdatedData }) => {
  const navigate = useNavigate();

  const [permissionValues, setPermissionValues] = useState({
    id: 0,
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermiso: 1,
    fechaPermiso: Date.now(),
  });

  const [isLoading, setIsLoading] = useState(false);

  const [propsModalError, setPropsModalError] = useState({
    title: undefined,
    text: undefined,
  });

  const initialDataPermision = [];

  initialDataPermision.push({
    id: 1,
    descripcion: "User",
  });

  const [permissionType, setPermissionType] = useState();
  const [permissionTypeList, setPermissionTypeList] = useState([]);
  const [updatedOk, setUpdatedOk] = useState(false);
  const [isOpenOkModal, setIsOpenOkModal] = useState(false);
  const handleOpenOkModal = () => setIsOpenOkModal(true);
  const handleCloseOkModal = () => {
    setIsOpenOkModal(false);

    // PENDING CHANGE TO REDUCER REDUX TOOLKIT
    //window.location.href = "/";
  };

  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const handleOpenErrorModal = () => setIsOpenErrorModal(true);
  const handleCloseErrorModal = () => setIsOpenErrorModal(false);

  useEffect(
    () => {
      getDataPermission();
    },
    [idGuiid]
  );

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
          setPermissionTypeList(response);
        }
        setIsLoading(false);
      }
    });
  };

  const getDataPermission = async () => {
    try {
      //console.log("getDataPermission id", idGuiid);

      if (idToModify && idToModify !== "undefined" && idToModify !== "") {
        setIsLoading(true);

        GetPermissionByIdData(idToModify).then((response) => {
          //console.log("respuesta api get data id", idToModify, response);

          if (response?.ok && response.ok === false) {
            // setPropsModalError({
            //   title: "Error loading API",
            //   text: "Please try again.",
            // });

            setIsLoading(false);
            handleOpenErrorModal(); // show error
            //setOpenOkModal(false);
          } else {
            if (response) {
              // data id read ok
              //console.log("data id read ok", response);

              setPermissionValues({
                id: response.id,
                nombreEmpleado: response.nombreEmpleado,
                apellidoEmpleado: response.apellidoEmpleado,
                tipoPermisoCode: response.tipoPermisoCode,
                tipoPermisoDesc: response.tipoPermisoDesc,
                fechaPermiso: response.fechaPermiso,
              });

              GetAllPermissionTypeByIdData(response.tipoPermisoCode).then(
                (responseType) => {
                  if (responseType?.ok && responseType.ok === false) {
                    // setPropsModalError({
                    //   title: "Error loading API",
                    //   text: "Please try again.",
                    // });

                    setIsLoading(false);
                    handleOpenErrorModal(); // show error
                    //setOpenOkModal(false);
                  } else {
                    if (responseType) {
                      // data type was readed ok
                      console.log("se setea Id", responseType);

                      setPermissionType(responseType);
                    }
                  }
                }
              );
            }

            //setOpenErrorModal(false);
            setIsLoading(false);
          }
        });

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatedOk(true);
    }
  };

  const onSubmit = async (
    { id, nombreEmpleado, apellidoEmpleado, tipoPermisoCode, fechaPermiso },
    { setSubmitting, setErrors, resetForm }
  ) => {
    console.log("inicio save...", id, tipoPermisoCode);

    try {
      // Grabs obj.x as as { otherName }
      //const { id: idSelectedDropDown } = tipoPermisoCode;

      setIsLoading(true);

      let inputData = {
        id: id,
        nombreEmpleado: nombreEmpleado,
        apellidoEmpleado: apellidoEmpleado,
        fechaPermiso: fechaPermiso,
        tipoPermiso: tipoPermisoCode, // destructure de id of dropdonlist
      };

      //console.log("sending data to modify", idToModify, inputData);

      ModifyPermissionData(inputData).then((response) => {
        //console.log("respuesta api get data id", idToModify, response);

        if (response?.ok && response.ok === false) {
          // setPropsMod=alError({
          //   title: "Error loading API",
          //   text: "Please try again.",
          // });

          setIsLoading(false);

          handleOpenErrorModal(); // show error
          //setOpenOkModal(false);
        } else {
          if (response) {
            //console.log("modify read Ok", response);

            setIsLoading(false);

            // clean values
            setPermissionValues({
              id: 0,
              nombreEmpleado: "",
              apellidoEmpleado: "",
              tipoPermisoCode: 1,
              fechaPermiso: Date.now(),
            });

            resetForm();

            handleOpenOkModal();

            setUpdatedData(true);
          }
        }
      });

      resetForm();
    } catch (error) {
      console.log(error);
      //console.log(error.message);
      if (error.code === "Error_generic") {
        setErrors({ nombreEmpleado: "Error_generic" });
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    nombreEmpleado: Yup.string().trim().min(1).max(49).required(),
    apellidoEmpleado: Yup.string().trim().min(1).max(49).required(),
    //tipoPermiso: Yup.string().trim().required(),
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
    id: 0,
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermisoCode: 1,
    // tipoPermisoDesc: "",
    fechaPermiso: Date.now(),
  };

  return (
    <>
      <AnimatedModal
        title={"Permission modified successfully!"}
        description={"The permision was modified!"}
        isOpen={isOpenOkModal}
        handleClose={handleCloseOkModal}
        customProps={propsModalError}
        success={true}
      ></AnimatedModal>
      <AnimatedModal
        title={"The permission could not be modified"}
        description={
          "The permission could not be modified. Please check de input data or try again later"
        }
        isOpen={isOpenErrorModal}
        handleClose={handleCloseErrorModal}
        customProps={propsModalError}
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
          Modify Permission
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
            setFieldValue,
          }) => (
            <Box onSubmit={handleSubmit} component="form" sx={4}>
              <TextField
                type="text"
                label="Id"
                value={values.id}
                variant="outlined"
                name="id"
                fullWidth
                sx={{ mb: 3 }}
                inputProps={{ readOnly: true }}
              />

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
                // onChange={(event, value) => {
                //   console.log("setting type: ", value);
                //   const { id } = value;
                //   values.tipoPermiso = id;
                //   setPermissionType(value);
                // }}
                onChange={(event, value) => {
                  console.log("setting type: ", value);
                  // console.log('do the types match?', typeof value === typeof values.address.country);
                  // console.log('do the objects match?', value === values.address.country);
                  // console.log('the objects in question', value, values.address.country);

                  const { id } = value;
                  values.tipoPermiso = id;
                  setPermissionType(value);

                  console.log("se setea Id", value);
                  //setPermissionType(value);

                  setFieldValue("tipoPermisoCode", id);
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
                  value={dayjs(values.fechaPermiso)}
                  //inputFormat="DD/MM/YYYY"
                  name="fechaPermiso"
                  onChange={(value, x) => {
                    console.log(
                      "selected permission Date: ",
                      JSON.stringify(value)
                    );
                    // values.fechaPermiso = JSON.stringify(value);
                    values.fechaPermiso = dayjs(value);
                  }}
                  fullWidth
                  views={["year", "month", "day"]}
                  sx={{ mb: 3 }}
                />
              </LocalizationProvider>

              <LoadingButton
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                variant="contained"
                fullWidth
                sx={{ mb: 3 }}
              >
                Send Modification
              </LoadingButton>
            </Box>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ModifyPermission;
