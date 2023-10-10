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

import { firestore , storage} from "../../firebase";

const DataTableAC = (props) => {

  const { slug, fetchDataRoom } = props;
  const isRoomPage = slug === "room";
  const [showModal, setShowModal] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [roomData , setRoomData] = useState([]);
  const [UserData , setUserData] = useState([]);
  const [showOccupied , setShowOccupied] = useState(false);
  const [showAssign , setShowAssign] = useState(false);
  const [showSlipImg , setShowSlipImg ] = useState('');
  const [smallModalTitle , setSmallModalTitle] = useState(null);
  const [smallModalDetail , setSmallModalDetail] = useState(null);

  const handleFetchDataRoom = async (status,roomNumber) => {
    try {
      console.log(roomNumber);
      const DocRef = await firestore.collection('rooms').doc(roomNumber);
      DocRef.get().then((doc) => {
        setRoomData(doc.data());

        if(status === 'Assign'){const ImgRef = storage.ref().child(`slip_image/${doc.data().img}`)
        ImgRef.getDownloadURL().then((url) => {
          setShowSlipImg(url);
        })}
        if(doc.exists){
          firestore.collection('profiles').doc(doc.data().owner).get().then((doc) => {
            if(doc.exists){
              setUserData(doc.data());
              //console.log(doc.data());
              if(status === 'Occupied'){
                setShowOccupied(true)
              } else if (status === 'Assign'){
                setShowAssign(true);
              }
            }else{
              console.log('ไม่พบข้อมูลเจ้าของห้อง')
            }
          })
        }else{
          console.log('not have this room');
        }
      })
    } catch (error) {
      console.log('error fetch data : ',error);
    }
  }

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
      owner: null,
      electric: "0",
      electricCurrent: "0",
      waterCurrent: "0",
      water: "0",
      img: null,
      datein: null,
      dateout: null,
      type: null,
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
              <Form.Group className="d-flex flex-row align-items-center">
              <Form.Label htmlFor="title" style={{ whiteSpace: "nowrap" }}>Room Number</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  id="title"
                />
              </Form.Group>
              <Form.Group className="d-flex flex-row align-items-center">
              <Form.Label htmlFor="title" style={{ whiteSpace: "nowrap" }}>Status Room</Form.Label>
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
                <Form.Label>Profile Name : {UserData.name}</Form.Label><br />
                <Form.Label>Profile Phone Number : {UserData.phone}</Form.Label><br />
                <Form.Label>Profile Email : {UserData.email}</Form.Label><br />
                <Form.Label>Profile DateIn : {roomData.datein}</Form.Label><br />
                <Form.Label>Profile DateOut : {roomData.dateout}</Form.Label>
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
              <Form.Label>Profile Name : {UserData.name}</Form.Label><br />
                <Form.Label>Profile Phone Number : {UserData.phone}</Form.Label><br />
                <Form.Label>Profile Email : {UserData.email}</Form.Label><br />
                <Form.Label>Profile DateIn : {roomData.datein}</Form.Label><br />
                <Form.Label>Profile DateOut : {roomData.dateout}</Form.Label><br />
                <img src={showSlipImg} alt="slip_bank_images" />
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
                handleFetchDataRoom(params.row.status , params.row.roomNumber);
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
