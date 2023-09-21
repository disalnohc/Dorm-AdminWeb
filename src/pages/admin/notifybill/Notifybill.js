import React, { useState } from "react";
import "./notifybill.css";
import DataTableBI from "../../../components/dataTableBI/DataTableBI";
import Add from "../../../components/add/Add";
import { bill  } from "../../../data.ts";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "roomNumber",
    type: "string",
    headerName: "เลขห้อง",
    width: 150,
  },
  {
    field: "fullName",
    type: "string",
    headerName: "ชื่อ - นามสกุล ",
    width: 220,
  },
  {
    field: "email",
    type: "string",
    headerName: "อีเมล",
    width: 220,
  },
  {
    field: "status",
    headerName: "สถานะ",
    type: "string",
    width: 220,
  },
];

const Notifybill = () => {
    const [open, setOpen] = useState(false);
  
    return (
      <div>
        <div className="info">
          <h1>เเจ้งบิล</h1>
        </div>
        <DataTableBI slug="products" columns={columns} rows={bill} />
        {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
      </div>
    );
  };
  
  export default Notifybill;