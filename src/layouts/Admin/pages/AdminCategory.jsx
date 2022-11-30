import React, { useState } from "react";
import { useEffect } from "react";
import { get, remove } from "../../../api/category";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { DataGrid } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import AddCategory from "../components/AddCategory";
import ModalCategory from "../components/UpdateCategoryModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  action: {
    display: "flex",
  },
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
  add: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
  },
  padding: {
    paddingLeft: "1rem",
  },
}));

const StyledDataGrid = withStyles({
  root: {
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      maxHeight: "none !important",
      whiteSpace: "normal",
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-cell--textLeft.MuiDataGrid-cell--withRenderer": {
      justifyContent: "center",
    },
    "& .MuiDataGrid-cell--textLeft ": {
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
    },
    "& .MuiAvatar-img": {
      objectFit: "contain",
    },
  },
})(DataGrid);

const AdminCategory = () => {
  const [data, setData] = useState([]);

  const [open, setOpen] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  const [value, setvalue] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleUpdateOpen = () => setIsOpen(true);

  const handleUpdateClose = () => setIsOpen(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await get();
    setData(data);
  };
  const handleDelete = async (id) => {
    await remove(id);
    fetchData();
  };

  const handleOpenModal = (data) => {
    setvalue(data);
    setIsOpen(true);
  };

  const classes = useStyles();

  const rows = data.map((category) => ({
    id: category.id,
    name: category.name,
    total: category.products.length,
  }));

  const columns = [
    { field: "id", headerName: "#", width: 100, sortable: false },

    {
      field: "name",
      headerName: "Name",
      sortable: false,
      width: 300,
    },
    {
      field: "total",
      headerName: "Total",
      sortable: false,
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <div className={classes.action}>
            <div>
              <IconButton color="primary">
                <CreateIcon onClick={() => handleOpenModal(params)} />
              </IconButton>
            </div>
            <div>
              <IconButton
                color="secondary"
                onClick={() => handleDelete(params.id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <div className={classes.add}>
          <Fab
            color="primary"
            aria-label="add"
            size="medium"
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
          <p className={classes.padding}>Add Category</p>
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <AddCategory handleClose={handleClose} />
            </div>
          </Fade>
        </Modal>
        <ModalCategory
          isOpen={isOpen}
          onOpen={handleUpdateOpen}
          onClose={handleUpdateClose}
          value={value}
        />
      </div>
      <div style={{ height: 800, width: "50%" }}>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          rowHeight={100}
          autoHeight
        />
      </div>
    </>
  );
};
export default AdminCategory;
