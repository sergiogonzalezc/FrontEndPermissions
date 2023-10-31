import { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  GetPermissionByIdData,
  ModifyPermissionData,
  GetAllPermissionTypesData,
} from "../api/permissionApi";

import * as Yup from "yup";
import parse from "date-fns/parse";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";

const ModifyPermission = ({ idToModify }) => {
  // const [idToModify, setIdToModify] = useState();
  const [showModalError, setShowModalError] = useState(false);
  const [propsModalError, setPropsModalError] = useState({
    title: undefined,
    text: undefined,
  });

  const [permissionValues, setPermissionValues] = useState({
    id: 0,
    nombrePostulante: "",
    apellidoPostulante: "",
    TipoPermiso: 0,
    fechaPermiso: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [handleCloseConfirmation, setHandleCloseConfirmation] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [permissionType, setPermissionType] = useState();
  const [permissionTypeList, setPermissionTypeList] = useState([]);
  // const ModifyIdPrincipal = async () => {
  //   const search = useLocation().search;
  //   const id = new URLSearchParams(search).get("id");

  //   if (id) {
  //     console.log("read id querystring", id);
  //     setIdToModify(id);
  //   }
  // };

  useEffect(() => {
    getDataPermission();
  }, [idToModify]);

  useEffect(() => {
    getAllPermissionTypes();
  }, []);

  const getAllPermissionTypes = async () => {
    setIsLoading(true);

    GetAllPermissionTypesData().then((response) => {
      console.log("list types", response);

      if (response?.ok && response.ok === false) {
        setPropsModalError({
          title: "Error loading API",
          text: "Please try again.",
        });

        setIsLoading(false);
        setOpenErrorModal(true); // show error
        setOpenConfirmation(false);
      } else {
        if (response) {
          // if delete is OK
          console.log("list types OK");
          setOpenConfirmation(true); // show modal Ok

          setPermissionTypeList(response);
        }

        setOpenErrorModal(false);
        setIsLoading(false);
      }
    });
  };

  const getDataPermission = async () => {
    if (idToModify && idToModify !== "undefined" && idToModify !== "") {
      setIsLoading(true);
      GetPermissionByIdData(idToModify).then((response) => {
        console.log("respuesta api get data id", idToModify, response);

        if (response?.ok && response.ok === false) {
          setPropsModalError({
            title: "Error loading API",
            text: "Please try again.",
          });

          setIsLoading(false);
          setOpenErrorModal(true); // show error
          setOpenConfirmation(false);
        } else {
          if (response) {
            // if delete is OK
            console.log("modify read Ok", response);
            setOpenConfirmation(true); // show modal Ok

            setPermissionValues({
              id: response.id,
              nombreEmpleado: response.nombreEmpleado,
              apellidoEmpleado: response.apellidoEmpleado,
              tipoPermisoCode: response.tipoPermisoCode,
              tipoPermisoDesc: response.tipoPermisoDesc,
              fechaPermiso: response.fechaPermiso,
            });
          }

          setOpenErrorModal(false);
          setIsLoading(false);
        }
      });

      setIsLoading(false);
    }
  };

  const onSubmit = async (
    { id, nombreEmpleado, apellidoEmpleado, tipoPermiso, fechaPermiso },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      console.log(
        "modificado datos",
        id,
        nombreEmpleado,
        apellidoEmpleado,
        tipoPermiso,
        fechaPermiso
      );

      setIsLoading(true);
      ModifyPermissionData(
        id,
        nombreEmpleado,
        apellidoEmpleado,
        tipoPermiso,
        fechaPermiso
      ).then((response) => {
        console.log("respuesta api get data id", idToModify, response);

        if (response?.ok && response.ok === false) {
          setPropsModalError({
            title: "Error loading API",
            text: "Please try again.",
          });

          setIsLoading(false);
          setOpenErrorModal(true); // show error
          setOpenConfirmation(false);
        } else {
          if (response) {
            // if delete is OK
            console.log("modify read Ok", response);
            setOpenConfirmation(true); // show modal Ok

            setPermissionValues({
              id: response.id,
              nombreEmpleado: response.nombreEmpleado,
              apellidoEmpleado: response.apellidoEmpleado,
              tipoPermisoCode: response.tipoPermisoCode,
              tipoPermisoDesc: response.tipoPermisoDesc,
              fechaPermiso: response.fechaPermiso,
            });
          }

          setOpenErrorModal(false);
          setIsLoading(false);
        }
      });

      setIsLoading(false);

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
    tipoPermisoCode: Yup.string().trim().min(1).required(),
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const setTipo = async (type) => {
    setPermissionType(type);
    console.log("seteado tipo: ", type);
  };

  const defProps = {
    options: permissionTypeList.map((option) => ({
      id: option.id,
      name: option.descripcion,
    })),
    getOptionLabel: (options) => options.id + "-" + options.name,
  };

  const initialValues = {
    id: 0,
    nombreEmpleado: "sssss",
    apellidoEmpleado: "",
    tipoPermisoCode: 1,
    // tipoPermisoDesc: "",
    fechaPermiso: "",
  };

  return (
    <>
      <Modal
        open={openErrorModal}
        // onClose={handleCloseConfirmation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Error
          </Typography>
        </Box>
      </Modal>

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
          }) => (
            <Box onSubmit={handleSubmit} component="form" sx={4}>
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
                {...defProps}
                value={permissionType || null}
                onChange={(event, value) => setTipo(value)}
                // inputValue={permissionType}
                onInputChange={(event, newInputValue) => {
                  setTipo(newInputValue);
                }}
                disablePortal
                id="tipoPermiso"
                // options={  permissionTypeList.map((option) => ({
                //   id: option.id,
                //   name: option.descripcion,
                // }))}
                sx={{ mb: 3 }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="id"
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

              {/* <AutoComplete></AutoComplete> */}

              <TextField
                type="text"
                label="Fecha Permiso/Permission Date"
                value={values.fechaPermiso}
                onChange={handleChange}
                name="fechaPermiso"
                fullWidth
                sx={{ mb: 3 }}
                id="fechaPermiso"
                placeholder="John"
                onBlur={handleBlur}
                error={errors.fechaPermiso && touched.fechaPermiso}
                helperText={
                  errors.fechaPermiso &&
                  touched.fechaPermiso &&
                  errors.fechaPermiso
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
