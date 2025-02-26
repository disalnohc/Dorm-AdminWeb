import React, { useState, useEffect } from "react";
import "./electricity.css";
import DataTableAC from "../../../components/dataTableroom/DataTableRoom";
import Add from "../../../components/add/Add";
import { firestore } from "../../../firebase";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "roomNumber",
    type: "string",
    headerName: "เลขห้อง",
    width: 150,
  },
  {
    field: "status",
    type: "string",
    headerName: "สถานะ",
    width: 200,
  },
  {
    field: "previousMeter",
    headerName: "เลขมิเตอร์ก่อนหน้า",
    type: "string",
    width: 200,
  },
  {
    field: "currentMeter",
    headerName: "เลขมิเตอร์ปัจจุบัน",
    type: "string",
    width: 200,
  },
  {
    field: "consumptionDifference",
    headerName: "ส่วนต่าง",
    type: "string",
    width: 200,
  },
];

const Detail = () => {
  const [open, setOpen] = useState(false);
  const [electricData, setElectricData] = useState([]);
  const [displayDateFormatted , setDisplayDateFormatted] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collRef = firestore.collection('rooms')
        const querySnapshot = await collRef.get();
        const data = querySnapshot.docs.map((doc, index) => ({
          id: index + 1,
          roomNumber: doc.id,
          status: doc.data().status,
          previousMeter: doc.data().electric,
          currentMeter: doc.data().electricCurrent,
          consumptionDifference: parseInt(doc.data().electricCurrent) - parseInt(doc.data().electric),
        }));
        setElectricData(data);
      } catch (error) {
        console.log('error fetch data : ', error)
      }
    }
    displayDate();
    fetchData();
  }, []);

  const displayDate = () => {
    const date = new Date();
    const year = date.getFullYear() + 543; // เพิ่ม 543 เพื่อแปลงเป็นปีพุทธศักราช
    const monthNames = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
      'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
      'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const month = monthNames[date.getMonth()];

    const formattedDate = `ค่าไฟฟ้า เดือน ${month} ปี ${year}`;
    setDisplayDateFormatted(formattedDate);
  }

  return (
    <div>
      <div className="header-content">
        <h2>{displayDateFormatted}</h2>
      </div>
      <DataTableAC slug="products" columns={columns} rows={electricData} />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Detail;