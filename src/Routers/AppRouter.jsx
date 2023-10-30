import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../Ui/NavBar";
import Home from "../Pages/Home";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RegisterNewPermision from "../Pages/RegisterNewPermision";
import ModifyPermission from "../Pages/ModifyPermission";
import RequestPermission from "../Pages/RequestPermission";

const AppRouter = () => {
  // create a darkTheme function to handle dark theme using createTheme
  const darkTheme = createTheme({
    palette: {
      // 'dark'  : 'light'
      mode: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="Home" element={<Home></Home>}></Route>
          <Route path="requestpermission" element={<RequestPermission></RequestPermission>}></Route>
          <Route path="registernewpermision" element={<RegisterNewPermision></RegisterNewPermision>}></Route>
          <Route path="modifypermission" element={<ModifyPermission></ModifyPermission>}></Route>

          {/* default route */}
          <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default AppRouter;
