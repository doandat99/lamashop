import React, { useState } from "react";
import { useEffect } from "react";
import { get, remove } from "../../../api/product";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import FormAdminProduct from "../components/FormAdminProduct";
import UpdateModal from "../components/UpdateModal";

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

const AdminProduct = () => {
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

  const rows = data.map((product, index) => {
    return {
      id: index + 1,
      image: product.image,
      title: product.title,
      price: product.price,
      quantity: product?.rating?.count || product.quantity,
      category: product.category,
      description: product.description?.substring(0, 50),
    };
  });

  const columns = [
    { field: "id", headerName: "#", width: 100, sortable: false },
    {
      field: "image",
      headerName: "Image",
      width: 300,
      editable: true,
      sortable: false,
      renderCell: (params) => (
        <Avatar
          alt="Remy Sharp"
          src={params.value}
          className={classes.large}
          variant="square"
        />
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 300,
      editable: true,
      sortable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 250,
      editable: true,
      sortable: false,
    },
    {
      field: "category",
      headerName: "Catagory",
      width: 250,
      editable: true,
      sortable: false,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      sortable: false,
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 500,
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
              <IconButton
                color="primary"
                onClick={() => handleOpenModal(params)}
              >
                <CreateIcon />
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
          <p className={classes.padding}>Add Product</p>
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
              <FormAdminProduct handleClose={handleClose} />
            </div>
          </Fade>
        </Modal>
        <UpdateModal
          isOpen={isOpen}
          onOpen={handleUpdateOpen}
          onClose={handleUpdateClose}
          value={value}
        />
      </div>
      <div style={{ height: 800, width: "100%" }}>
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

export default AdminProduct;
