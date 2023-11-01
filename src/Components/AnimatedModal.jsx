import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const AnimatedModal = ({
  title,
  description,
  isOpen,
  handleClose,
  success,
}) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <div>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        fullWidth
        open={isOpen}
        onClose={handleClose}
        //closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <DialogTitle>
          {success ? (
            <CheckCircleIcon></CheckCircleIcon>) : (
            <ErrorOutlineIcon></ErrorOutlineIcon>
          )}
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnimatedModal;
