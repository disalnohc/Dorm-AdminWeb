import React, { useState } from "react";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import PageviewIcon from '@mui/icons-material/Pageview';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./dataTable.css";
import Button from '@mui/material/Button';
import {
  GridToolbarExport,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { firestore } from "../../firebase";

const DataTableAC = (props) => {

  const { slug, fetchDataRoom } = props;
  const isRoomPage = slug === "room";
  const [showModal, setShowModal] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomId, setRoomId] = useState('');

  const [showOccupied , setShowOccupied] = useState(false);
  const [showAssign , setShowAssign] = useState(false);

  const [smallModalTitle , setSmallModalTitle] = useState(null);
  const [smallModalDetail , setSmallModalDetail] = useState(null);

  const handleDelete = async () => {
    try {
      await firestore.collection('rooms').doc(roomId).delete();
      console.log(`Room ${roomId} deleted successfully.`);
      setShowDeleteModal(false);
      fetchDataRoom();
        setTimeout(() => {
        setSmallModalTitle('Delete Success');
        setSmallModalDetail(`Delete Room : ${roomId} Success`);
        setShowSmallModal(true);
      }, 1000);
      setTimeout(() => {
        setShowSmallModal(false);
      }, 2000);
    } catch (error) {
      console.log('error delete room : ', error);
    }
  };

  const handleAddRoom = async () => {
    const NewRoomData = {
      owner: "",
      electric: "0",
      electricCurrent: "0",
      waterCurrent: "0",
      water: "0",
      img: "",
      datein: "",
      dateout: "",
      status: document.getElementById("Status").value,
    }
    try {
      const RoomID = document.getElementById("title").value;

      await firestore.collection('rooms').doc(RoomID).set(NewRoomData);
      console.log('add new room success');
      setShowModal(false);
      fetchDataRoom();
      setTimeout(() => {
        setSmallModalTitle('Add Success');
        setSmallModalDetail(`Add Room Number : ${roomId} Success`);
        setShowSmallModal(true);
      }, 1000);
      setTimeout(() => {
        setShowSmallModal(false);
      }, 2000);
    } catch (error) {
      console.log("error add new room : ", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setShowAssign(false);
    setShowOccupied(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleEdit = (status) => {
    //alert(roomNumber + " " + status)
    switch(status) {
      case 'Occupied' :
        setShowOccupied(true);
        //alert('Occupied');
        break;
      case 'Assign' :
        setShowAssign(true);
        //alert('Assign');
        break;
      default : console.log('error room status');      
    }
  };

  const handleOccupied = async () => {
    try {
      await firestore.collection('rooms').doc(roomId).update({ 
        status : 'Occupied'
       }).then(() =>{
        console.log('Update Success');
        handleClose();
        fetchDataRoom();
        setTimeout(() => {
        setSmallModalTitle('Update Success');
        setSmallModalDetail(`Update Room ${roomId} : to Occupied Success`);
        setShowSmallModal(true);
      }, 1000);
      setTimeout(() => {
        setShowSmallModal(false);
      }, 2000);
      }).catch((error) => {
        console.error('Error Update : ',error);
      })
    } catch (error) {
      console.log('error update to Occupied : ',error)
    }
  };

  const handleVacant = async () => {
    try {
      await firestore.collection('rooms').doc(roomId).update({ 
        status : 'Vacant',
        datein : '',
        dateout : '',
        img : '',
        owner : '',
       }).then(() =>{
        console.log('Update Success');
        handleClose();
        fetchDataRoom();
        setTimeout(() => {
        setSmallModalTitle('Update Success');
        setSmallModalDetail(`Update Room ${roomId} : to Vancant Success`);
        setShowSmallModal(true);
      }, 1000);
      setTimeout(() => {
        setShowSmallModal(false);
      }, 2000);
      }).catch((error) => {
        console.error('Error Update : ',error);
      })
    } catch (error) {
      console.log('error update to Vacant : ',error)
    }
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

        <Modal show={showSmallModal} onHide={handleClose} >
          <Modal.Header >
            <Modal.Title>{smallModalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label><CheckIcon />{smallModalDetail}</Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showDeleteModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Room {roomId}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Are you sure to delete room : {roomId} ?</Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button color="error" variant="outlined" onClick={handleDelete}>
              Delete Room
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showOccupied} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title>Room {roomId} Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group controlId="profile owner">
                <Form.Label>Profile Name</Form.Label><br />
                <Form.Label>Profile Phone Number</Form.Label><br />
                <Form.Label>Profile Email</Form.Label><br />
                <Form.Label>Profile DateIn</Form.Label><br />
                <Form.Label>Profile DateOut</Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="error" variant="outlined" onClick={handleVacant}>
              Change to Vacant
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showAssign} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title>Room {roomId} Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="profile owner">
                <Form.Label>Profile Name</Form.Label><br />
                <Form.Label>Profile Phone Number</Form.Label><br />
                <Form.Label>Profile Email</Form.Label><br />
                <Form.Label>Profile DateIn</Form.Label><br />
                <Form.Label>Profile DateOut</Form.Label>
                <img src="profile_image_url_here" alt="slip_bank_images" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="success" variant="contained" onClick={handleOccupied}>
              Change to Occupied
            </Button>
            <Button color="error" variant="outlined" onClick={handleVacant} >
              Change to Vacant
            </Button>
            <Button onClick={handleClose}>
              Close
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
          {props.slug === 'room' && (
            params.row.status !== "Vacant" && (
              <IconButton onClick={() => {
                setRoomId(params.row.roomNumber);
                handleEdit(params.row.status);
              }}>
                <PageviewIcon />
              </IconButton>
            )
          )
          }
          
          <div className="delete" onClick={() => {
            setRoomId(params.row.roomNumber);
            setShowDeleteModal(true);
          }}>
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
        columns={ isRoomPage ? [...props.columns , actionColumn] : props.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        slots={{ toolbar: isRoomPage ? CustomToolbar : GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTableAC;
