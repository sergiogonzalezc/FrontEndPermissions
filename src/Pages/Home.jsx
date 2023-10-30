import { useState, useEffect } from "react";
import * as React from "react";
import { GetPermissionData } from "../api/permissionApi";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";
import AnimatedModal from "../Components/AnimatedModal";
import ModifyPermission from "./ModifyPermission";

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

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

// function Modal({ children }) {
//   return ReactDOM.createPortal(children, document.body);
// }
// function ModalButton(props) {
//   const [visible, setVisible] = React.useState(false);
//   return (
//     <div>
//       <button variant="contained" size="small" onClick={() => setVisible(true)}>
//         View download
//       </button>
//       {visible && (
//         <Modal>
//           <div className="overlay" style={{position: "fixed", inset: "0 0 0 0"}}></div>
//           <div
//             style={{
//               top:"30%",
//               left: "30%",
//               position: "fixed",
//               width:"300px",
//               height: "300px",
//               backgroundColor: "rgba(0, 0, 0, 0.5)"
//             }}
//           >
//             <div style={{textAlign: "right"}}>
//             <button style={{width: "100px"}} onClick={() => setVisible(false)}>Close</button>
//             </div>
//             <h1>Modal content</h1>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "nombreEmpleado",
    headerName: "Nombre",
    width: 200,
    editable: false,
  },
  {
    field: "apellidoEmpleado",
    headerName: "Apellido",
    width: 200,
    editable: false,
  },
  {
    field: "tipoPermisoDesc",
    headerName: "Permiso",
    // type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: "fechaPermiso",
    headerName: "Fecha Permiso",
    description: "Fecha en que se otorga el permiso.",
    type: "datetime",
    width: 110,
    editable: false,

    // width: 160,
    // valueGetter: (params) =>
    //   `${params.row.NombreEmpleado || ''} ${params.row.ApellidoEmpleado || ''}`,
  },
];

// const rows = [
//   { id: 1, ApellidoEmpleado: 'Snow', NombreEmpleado: 'Jon', TipoPermisoDesc: 35 , FechaPermiso: '2023-11-29T14:08:06.861Z' },
//   { id: 2, ApellidoEmpleado: 'Lannister', NombreEmpleado: 'Cersei', TipoPermisoDesc: 42 },
//   { id: 3, ApellidoEmpleado: 'Lannister', NombreEmpleado: 'Jaime', TipoPermisoDesc: 45 },
//   { id: 4, ApellidoEmpleado: 'Stark', NombreEmpleado: 'Arya', TipoPermisoDesc: 16 },
//   { id: 5, ApellidoEmpleado: 'Targaryen', NombreEmpleado: 'Daenerys', aTipoPermisoDesce: null },
//   { id: 6, ApellidoEmpleado: 'Melisandre', NombreEmpleado: null, TipoPermisoDesc: 150 },
//   { id: 7, ApellidoEmpleado: 'Clifford', NombreEmpleado: 'Ferrara', TipoPermisoDesc: 44 },
//   { id: 8, ApellidoEmpleado: 'Frances', NombreEmpleado: 'Rossini', TipoPermisoDesc: 36 },
//   { id: 9, ApellidoEmpleado: 'Roxie', NombreEmpleado: 'Harvey', aTipoPermisoDesce: 65 },
// ];

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

  const handleClose = () => setOpen(false);

  useEffect(() => {
    CallPermissionData();
  }, []);

  const CallPermissionData = () => {
    setIsLoading(true);

    GetPermissionData().then((response) => {
      console.log("respuesta api", response);

      if (response?.ok && response.ok === false) {
        setPropsModalError({
          title: "HA OCURRIDO UN ERROR AL INTENTAR VERIFICAR EL CERTIFICADO",
          text: "Por favor intenta nuevamente. Si el problema persiste contacta a tu ejecutiva.",
        });

        // Swal.fire({
        //   title: 'Error llamando a API!',
        //   text: 'You clicked the button.',
        //   icon: 'error'
        // });

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
  };

  // const headings = heroes.map((hero, index)=>
  //                     <h1 key={index}>{hero}</h1>)

  return (
    <>
      <AnimatedModal></AnimatedModal>

      <LoadingButton
        type="submit"
        disabled={isLoading}
        loading={isLoading}
        variant="contained"
        fullWidth
        sx={{ mb: 3 }}
      >
        Cargar
      </LoadingButton>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>

      {/* <Button onClick={handleOpen}>Open modal</Button>
      <Modal      
        open={open}
        onClose={handleClose}
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
      </Modal> */}

      <Button component={Link} to="/RegisterNewPermision" fullWidth>
        Register a new permission
      </Button>

      <Button component={Link} to="/RequestPermission" fullWidth>
        Request permission
      </Button>

      <Box sx={{ height: 500, width: 960 }}>
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
        />
      </Box>

      {idToModify ? <ModifyPermission idToModify={idToModify} /> : ""}
    </>
  );
};

export default Home;
