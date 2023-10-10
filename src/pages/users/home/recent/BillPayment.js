import React, { Component } from 'react';

const BillPayment = () => {

    return (
      <div className="agreement-main">
        <h1>ชำระบิล</h1>
        <div>
          <label>ค่าห้อง: </label>
          <input type="number" />
        </div>
        <div>
          <label>อัปโหลดใบเสร็จ: </label>
          <input type="file" accept="image/*"  />
        </div>
        <button>ยืนยันการชำระเงิน</button>
      </div>
    );
}

export default BillPayment;
