import { useState, useEffect } from "react";
import * as React from "react";
import { GetPermissionData } from "../api/permissionApi";
import { useNavigate } from "react-router-dom";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ModifyPermission from "./ModifyPermission";
import moment from "moment";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    renderCell: (params) => <Link>{params.value}</Link>,
  },
  {
    field: "nombreEmpleado",
    headerName: "Nombre",
    width: 150,
    editable: false,
  },
  {
    field: "apellidoEmpleado",
    headerName: "Apellido",
    width: 150,
    editable: false,
  },
  {
    field: "tipoPermisoDesc",
    headerName: "Permiso",
    // type: 'number',
    width: 80,
    editable: false,
  },
  {
    field: "fechaPermiso",
    headerName: "Fecha Permiso",
    description: "Fecha en que se otorga el permiso.",
    type: "datetime",
    width: 180,
    editable: false,
    valueFormatter: (params) =>
      moment(params?.value).format("DD/MM/YYYY hh:mm A"),
  },
];

const Home = () => {
  const [count, setCount] = useState(0);
  const [permissionList, setPermissionList] = useState([]);
  const [showModalError, setShowModalError] = useState(false);
  const [propsModalError, setPropsModalError] = useState({
    title: undefined,
    text: undefined,
  });

  const [dataItemPermission, setDataItemPermission] = useState([
    {
      id: 0,
      nombreEmpleado: "",
      apellidoEmpleado: "",
      tipoPermiso: "",
      fechaPermiso: "01-01-1000",
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [idToModify, setIdToModify] = useState();

  const [open, setOpen] = React.useState(false);

  const handleModifyPermission = (dataId) => {
    console.log("click id", dataId);

    setIdToModify(dataId);
    //navigate(`/modifypermission?id=${dataId}`, { replace: true });
  };


  useEffect(() => {
    CallPermissionData();
  }, []);

  const CallPermissionData = () => {
    setIsLoading(true);

    try {
      GetPermissionData().then((response) => {
        console.log("respuesta api", response);

        if (response?.ok && response.ok === false) {
          setPropsModalError({
            title: "Error loading API",
            text: "Please try again.",
          });
       
          setIsLoading(false);
          setOpen(true);
        } else {
          if (response) {
            setPermissionList(response);
          }

          setOpen(false);
          setIsLoading(false);
        }
      });
    } catch {
      setIsLoading(false);
      setPropsModalError({
        title: "Error loading API",
        text: "Please try again.",
      });

      setShowModalError(true);
    }
  };

  return (
    <>     

      <Grid container spacing={2}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* Buttons */}
        <Grid item xs={6} md={6} mt={4}>
          <Item>
            <Button component={Link} to="/RequestPermission" fullWidth>
              Request permission
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6} md={6} mt={4}>
          <Item>
            <Button component={Link} to="/RegisterNewPermision" fullWidth>
              Register a new permission
            </Button>
          </Item>
        </Grid>

        {/* Grid section */}
        <Grid item xs={8} mt={4}>
          <Item>
            <Box>
              <h2>Permission List</h2>
              <DataGrid
                rows={permissionList}
                columns={columns}
                onRowClick={(rows) => {
                  handleModifyPermission(rows.id);
                }}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  // disable cell selection style
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  // pointer cursor on ALL rows
                  "& .MuiDataGrid-row:hover": {
                    cursor: "pointer",
                    backgroundColor: "#495057",
                  },
                }}
              />
            </Box>
          </Item>
        </Grid>

        {/* Modify section */}
        <Grid item xs={4} mt={4}>
          <Item>
            {idToModify ? <ModifyPermission idToModify={idToModify} /> : ""}
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
