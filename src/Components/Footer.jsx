import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box mt={4}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 2,
      }}
      component="footer"
    >
      <Container maxWidth="xm" >
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "} Sergio González C. {new Date().getFullYear()} {"."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
