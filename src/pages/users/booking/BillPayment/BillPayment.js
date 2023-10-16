import React from 'react';
import './BillPayment.css';
import qrCodeImage from '../../images/qr-code.png';

const BillPayment = () => {
  return (
    <div className="main-bpn">
      <div className="bpn-body">
        <div>
          <div className="bpn-header">
            <text className="bpn-title">ค่าสัญญาเช่า</text><br />
          </div>
          <div className="bpn-detail">
            <img src={qrCodeImage} alt="QR Code" />
          </div>
          <div className="bpn-teble">
            <table className="table1">
              <thead className="table2">
                <tr className="table3">
                  <th className="table4">เลขห้อง</th>
                  <th className="table4">ราคา</th>
                </tr>
              </thead>
              <tbody className="table2">
                <tr className="table3">
                  <td className="table4">ค่ามัดจำ</td>
                  <td className="table4">฿1,200</td>
                </tr>
                <tr className="table3">
                  <td className="table4">ยอดรวม</td>
                  <td className="table4">฿1,200</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bpn-up">
            <label>Choose an Image</label>
            <input type="file" accept="image/*" />
          </div>

          <div className="footer-bpn">
            <button className="bill-btn"><a>ยืนยัน</a></button>
            <button className="bill-btn2"><a>ยกเลิก</a></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillPayment;
