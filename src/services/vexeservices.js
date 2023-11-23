
import db from "../models/index";
import emailServices from "./emailServices";
require("dotenv").config();

let getAllvexe = (vexeid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let vexe = "";
      if (vexeid == "ALL") {
        vexe = db.vexe.findAll({
          // ẩn mật khẩu
          order: [["createdAt", "DESC"]],
        });
      }
      if (vexeid && vexeid !== "ALL") {
        vexe = await db.vexe.findOne({
          where: { machuyen: vexeid }, //  userId laf cais tham so truyen vao
          // ẩn mật khẩu
        });
      }
      resolve(vexe);
    } catch (e) {
      reject(e);
    }
  });
};





let Createvexe = (data) => {
  return new Promise(async (resolve, reject) => {
    try {

      if(!data.soghe){
        resolve({
          errcode: 2,
          errMessage: "Vui lòng chọn ghế",
        });
      }else if(!data.sdt){
        resolve({
          errcode: 2,
          errMessage: "Vui lòng điền số điện thoại",
        });
      }
      
      
      
      else{
        const newVexe =   await db.vexe.create({
          sdt:data.sdt,
          giave: data.giave,
          soghe: data.soghe,
          machuyen: data.machuyen,
          thoigianbatdau:data.thoigianbatdau,
          thoigianmua:data.thoigianmua,
          matk: data.matk,
        });
        const newVexeId = newVexe._id || newVexe.id;

        // gui email
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
       let ngaydi=formatDate(data.thoigianbatdau);
          await emailServices.sendSimpleEmail({
            reciverEmail: data.reciverEmail,
            hoten: data.hoten,
            ngaydat: ngaydatne,
            machuyen: newVexeId,
            giodi: data.giodi,
            soghe: data.soghe,
            thoigianbatdau:ngaydi,
            thoigianmua:data.thoigianmua,
            tonggia: data.tonggia,
          });
        }

        // Truyền newVexeId vào hàm guiemail
        
        resolve({
          errcode: 0,
          data: data,
        });
  
        resolve({
          errcode: 0,
          message: "OK",
        });
      }
     
    } catch (e) {
      reject(e);
    }
  });
};
let deletevexe = (vexeId) => {
  return new Promise(async (resolve, reject) => {
    let vexe = await db.vexe.findOne({
      where: { id: vexeId },
    });
    if (!vexe) {
      resolve({
        errcode: 2,
        errMessage: "vexe isn't exist !",
      });
    }
    await db.vexe.destroy({
      where: { id: vexeId },
    });
    resolve({
      errcode: 0,
      errMessage: "vexe is deleted !",
    });
  });
};
let updatevexeData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let vexe = await db.vexe.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (vexe) {
        vexe.sdt=data.sdt;
        vexe.giave = data.giave;
        vexe.soghe = data.soghe;
        vexe.machuyen = data.machuyen;
        vexe.thoigianbatdau = data.thoigianbatdau;
        vexe.thoigianmua = data.thoigianmua;
        vexe.matk = data.matk;

        await vexe.save();

        resolve({
          errcode: 0,
          errMessage: "update vexe succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "vexe not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllvexe: getAllvexe,
  Createvexe: Createvexe,
  deletevexe: deletevexe,
  updatevexeData: updatevexeData,
};
