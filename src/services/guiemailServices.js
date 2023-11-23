import db from "../models/index";
import emailServices from "./emailServices";
require("dotenv").config();




let guiemail = (data) => {
  return new Promise(async (resolve, reject) => {

    

    try {
      if (
        !data.hoten ||
        !data.reciverEmail ||
        !data.ngaydat ||
        !data.giodi ||
        !data.soghe ||
        !data.tonggia ||
        !data.machuyen
      ) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        
        const formatDate = (isoDate) => {
          const dateObject = new Date(isoDate);
          const day = dateObject.getDate();
          const month = dateObject.getMonth() + 1;
          const year = dateObject.getFullYear();
          return `${day}/${month}/${year}`;
        };
        let ngaydatne=formatDate(data.ngaydat);
        await emailServices.sendSimpleEmail({
          reciverEmail: data.reciverEmail,
          hoten: data.hoten,
          ngaydat: ngaydatne,
          machuyen: data,machuyen,
          giodi: data.giodi,
          soghe: data.soghe,
          tonggia: data.tonggia,
        });
      }

      resolve({
        errCode: 0,
        errMessage: "gui email thanh cong",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  guiemail: guiemail,

};
