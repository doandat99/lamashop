import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import FormCategory from "./UpdateCategoryForm";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "30rem",
  },
}));

const ModalCategory = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.isOpen}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.isOpen}>
          <div className={classes.paper}>
            <FormCategory
              onClose={props.onClose}
              data={props.value.row}
              onOpen={props.onOpen}
              onUpdate={props.onUpdate}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalCategory;
