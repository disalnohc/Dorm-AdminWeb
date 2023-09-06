import React, { useState, useEffect } from "react";
import "./room.css";
import DataTableAC from "../../components/dataTableAC/DataTableAC";
import Add from "../../components/add/Add";
import { firestore } from "../../firebase";

const columns = [
  { field: "id", headerName: "ลำดับ", width: 100 }, // เปลี่ยนชื่อเป็น "ลำดับ"
  {
    field: "roomNumber",
    type: "string",
    headerName: "เลขห้อง",
    width: 400,
  },
  {
    field: "status",
    type: "string",
    headerName: "สถานะ",
    width: 400,
  },
];

const Room = () => {
  const [open, setOpen] = useState(false);
  const [roomData, setRoomData] = useState([]); // เก็บข้อมูลจาก Firestore

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collRef = firestore
          .collection("Apartment")
          .doc("Room")
          .collection("RoomData");
        const querySnapshot = await collRef.get();
        const data = querySnapshot.docs.map((doc, index) => ({
          id: index + 1, // เปลี่ยน id เป็นลำดับข้อมูล
          roomNumber: doc.id,
          status: doc.data().status,
        }));
        setRoomData(data);
      } catch (error) {
        console.log("เกิดข้อผิดพลาดในการดึงข้อมูล : ", error);
      }
    };

    fetchData();
  }, []); // เรียก fetchData() เมื่อคอมโพเนนต์ถูกโหลดเสร็จสิ้นเพียงครั้งเดียว

  return (
    <div className="products">
      <div className="info">
        <h1>ผังห้องพัก</h1>
      </div>
      <DataTableAC slug="products" columns={columns} rows={roomData} />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Room;
