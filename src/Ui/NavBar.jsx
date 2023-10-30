import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import StoreIcon from '@mui/icons-material/Store';

export const Navbar = () => {
  
  return (

    <AppBar position="static">
    <Toolbar>
      <StoreIcon></StoreIcon>
      <Typography
          variant="h5"
          noWrap          
          component="a"          
          sx={{
            mr: 2,
            fontWeight: 200,
            fontFamily:'roboto',
            color:'white',
            letterSpacing: '.2rem',
            textDecoration: 'none',
          }}
        >
          Permission Administration v1.0
        </Typography>
    </Toolbar>
</AppBar>

  );
};
