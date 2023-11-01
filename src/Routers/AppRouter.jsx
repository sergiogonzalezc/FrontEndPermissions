import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RegisterNewPermision from "../Pages/RegisterNewPermision";
import RequestPermission from "../Pages/RequestPermission";
import NavBar from "../Ui/NavBar";

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

        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="Home" element={<Home></Home>}></Route>
          <Route path="requestpermission" element={<RequestPermission></RequestPermission>}></Route>
          <Route path="registernewpermision" element={<RegisterNewPermision></RegisterNewPermision>}></Route>

          {/* default route */}
          <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default AppRouter;
