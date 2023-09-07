import React, { useState } from "react";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import PageviewIcon from '@mui/icons-material/Pageview';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./dataTable.css";
import Button from '@mui/material/Button';
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { firestore } from "../../firebase";

const DataTableAC = (props) => {
  
  const { slug , fetchDataRoom } = props;
  const isRoomPage = slug === "room";
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
  };

  const handleAddRoom = () => {
    const NewRoomData = {
      owner: "",
      electric: "0",
      electricCurrent: "0",
      waterCurrent: "0",
      water: "0",
      status: document.getElementById("Status").value,
    }
    try {
      const RoomID = document.getElementById("title").value;

      const CollRef = firestore.collection('rooms').doc(RoomID);
      if (CollRef.set(NewRoomData)) {
        console.log('add new room success');
        setShowModal(false);
        fetchDataRoom();
      }
    } catch (error) {
      console.log("error add new room : ", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  function CustomToolbar() {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <GridToolbarQuickFilter />
        </div>
        <div>
          <Button variant="text" startIcon={<AddIcon />} onClick={handleShow}>ADD</Button>
          <GridToolbarExport />
        </div>
        <Modal show={showModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Room Number</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  id="title"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Status Room</Form.Label>
                <Form.Control as="select" name="Status" id="Status">
                  <option value="Vacant">Vacant</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Assign">Assign</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddRoom}>
              Add Room
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }



  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <IconButton>
              <PageviewIcon />
            </IconButton>
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            pageSize: 10,
          },
        }}
        slots={{ toolbar: isRoomPage ? CustomToolbar : GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTableAC;
