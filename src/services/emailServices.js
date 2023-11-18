const { reject } = require("lodash");
const nodemailer = require("nodemailer");
require("dotenv").config();

let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Đặt vé xe Futa nhóm 16 👻"<nhoxtuananh092@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Đặt vé xe", // Subject line
    text: "Thông tin đặt vé xe", // plain text body
    html: `<h3> Xin chào !</h3>
        <p> Bạn nhận được email này vì đã đặt vé xe trên trang web của chúng tôi</p>
        <p>Thông tin vé xe:</p>
        <div> <b>Họ và tên:${dataSend.hoten} <b/></div>
        <div> <b> mã chuyến xe:${dataSend.machuyen} <b/></div>
        <div> <b> Ngày đặt:${dataSend.ngaydat} <b/></div>
        <div> <b> Số ghế:${dataSend.soghe} <b/></div>
        <div> <b> Số tiền Thanh toán:${dataSend.tonggia} vnd <b/></div>
<p> Để tra cứu chi tiết vé xe hơn bạn hãy truy cập đường link dưới đây</p>

<div>
<a href= target="_blank"> Click here</a>
</div>
<div> Xin chân thành cảm ơn :3 </div>
        `, // html body
  });
};


module.exports = {
  sendSimpleEmail: sendSimpleEmail,
 
};
