import React from 'react';
import './AgreementPage.css'; 

const AgreementPage = () => {
  return (
    <div className="agreement-main">
      <h1 className="title-agp">สัญญาเช่าห้องพักอาศัย</h1>
      <p className="content-agp">
        สัญญาเช่าห้องพักที่...................................................
        วันที่.............เดือน..........................พ.ศ...............
        <br />
        สัญญาเช่าฉบับนี้ทำขึ้นระหว่าง...............................................
        ซึ่งต่อไปในสัญญานี้จะเรียกว่า "ผู้ให้เช่า"
        <br />
        ฝ่ายหนึ่ง กับ..................................
        อยู่บ้านเลขที่..................................
        หมู่บ้าน......................................
        <br />
        ถนน.........................................
        ตำบล/แขวง...................................
        อำเภอ/เขต....................................
        <br />
        จังหวัด......................................
        โทร........................................
      </p>
      <button><a href='/user/billpayment'>ชำระค่ามัดจำ</a></button>

    </div>
  );
};

export default AgreementPage;
