import React, { useState } from "react";
import "./detail.css";
import DataTableAC from "../../../components/dataTableAC/DataTableAC";
import Add from "../../../components/add/Add";
import { rooms  } from "../../../data.ts";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "img",
    headerName: "รูป",
    width: 150,
    renderCell: (params) => {
      return React.createElement("img", { src: params.row.img || "/noavatar.png", alt: "" });
    },
  },
  {
    field: "roomNumber",
    type: "string",
    headerName: "เลขห้อง",
    width: 150,
  },
  {
    field: "name",
    type: "string",
    headerName: "ชื่อ - นามสกุล ",
    width: 220,
  },
  {
    field: "details",
    type: "string",
    headerName: "อีเมล",
    width: 220,
  },
  {
    field: "phoneNumber",
    headerName: "เบอร์โทร",
    type: "string",
    width: 220,
  },
];

const Detail = () => {
    const [open, setOpen] = useState(false);
  
    return (
      <div>
        <div className="header-content">
          <h2>รายละเอียดผู้เช่า</h2>
        </div>
        <DataTableAC slug="products" columns={columns} rows={rooms} />
        {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
      </div>
    );
  };
  
  export default Detail;