import db from "../models/index";
let getAllchitietchuyenxe = (chitietchuyenxeid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chitietchuyenxe = "";
      if (chitietchuyenxeid == "ALL") {
        chitietchuyenxe = db.chitietchuyenxe.findAll({
          // ẩn mật khẩu
          order: [["createdAt", "DESC"]],
        });
      }
      if (chitietchuyenxeid && chitietchuyenxeid !== "ALL") {
      
          chitietchuyenxe = await db.chitietchuyenxe.findOne({
            where: { idttchuyenxe: chitietchuyenxeid }, //  userId laf cais tham so truyen vao
            // ẩn mật khẩu
          });
          if(chitietchuyenxe===null){
            let data="A, B, C, D, E, B,";
            chitietchuyenxe={
              soghe:data
            }
          }
        

      }
     
      resolve(chitietchuyenxe);
    } catch (e) {
      reject(e);
    }
  });
};

let Createchitietchuyenxe = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.chitietchuyenxe.create({
        idttchuyenxe:data.idttchuyenxe,
        soghe:data.soghe,
      
      });

      resolve({
        errcode: 0,
        data: data,
      });

      resolve({
        errcode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deletechitietchuyenxe = (chitietchuyenxeId) => {
  return new Promise(async (resolve, reject) => {
    let chitietchuyenxe = await db.chitietchuyenxe.findOne({
      where: { id: chitietchuyenxeId },
    });
    if (!chitietchuyenxe) {
      resolve({
        errcode: 2,
        errMessage: "chitietchuyenxe isn't exist !",
      });
    }
    await db.chitietchuyenxe.destroy({
      where: { id: chitietchuyenxeId },
    });
    resolve({
      errcode: 0,
      errMessage: "chitietchuyenxe is deleted !",
    });
  });
};
let updatechitietchuyenxeData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.idttchuyenxe ) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let chitietchuyenxe = await db.chitietchuyenxe.findOne({
        where: { idttchuyenxe: data.idttchuyenxe },
        raw: false,
      });
      if (chitietchuyenxe) {
       chitietchuyenxe.soghe=data.soghe,

        await chitietchuyenxe.save();

        resolve({
          errcode: 0,
          errMessage: "update chitietchuyenxe succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "chitietchuyenxe not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllchitietchuyenxe: getAllchitietchuyenxe,
  Createchitietchuyenxe: Createchitietchuyenxe,
  deletechitietchuyenxe: deletechitietchuyenxe,
  updatechitietchuyenxeData: updatechitietchuyenxeData,
};
