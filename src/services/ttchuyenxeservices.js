import db from "../models/index";
let getAllTTchuyenxe = (TTchuyenxeid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let TTchuyenxe = "";
      if (TTchuyenxeid == "ALL") {
        TTchuyenxe = db.TTchuyenxe.findAll({
          // ẩn mật khẩu
          order: [["createdAt", "DESC"]],
          include: [{
            model: db.chuyenxe,
            as: 'idmachuyenData',
            attributes: ['tenchuyen','dodai','diemdi','diemden','gia' ],
        }, ],
        raw: true,
        nest: true,
        });
      }
      if (TTchuyenxeid && TTchuyenxeid !== "ALL") {
        TTchuyenxe = await db.TTchuyenxe.findOne({
          where: { id: TTchuyenxeid }, //  userId laf cais tham so truyen vao
          // ẩn mật khẩu
          include: [{
            model: db.chuyenxe,
            as: 'idmachuyenData',
            attributes: ['tenchuyen','dodai','diemdi','diemden','gia' ],
        }, ],
        raw: true,
        nest: true,
        });
      }
      resolve(TTchuyenxe);
    } catch (e) {
      reject(e);
    }
  });
};

let CreateTTchuyenxe = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.TTchuyenxe.bulkCreate(data);

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
let deleteTTchuyenxe = (TTchuyenxeId) => {
  return new Promise(async (resolve, reject) => {
    let TTchuyenxe = await db.TTchuyenxe.findOne({
      where: { id: TTchuyenxeId },
    });
    if (!TTchuyenxe) {
      resolve({
        errcode: 2,
        errMessage: "TTchuyenxe isn't exist !",
      });
    }
    await db.TTchuyenxe.destroy({
      where: { id: TTchuyenxeId },
    });
    resolve({
      errcode: 0,
      errMessage: "TTchuyenxe is deleted !",
    });
  });
};
let updateTTchuyenxeData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let TTchuyenxe = await db.TTchuyenxe.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (TTchuyenxe) {
        TTchuyenxe.machuyen=data.machuyen,
        TTchuyenxe.ngay=data.ngay,
        TTchuyenxe.soluongve=data.soluongve,

        await TTchuyenxe.save();

        resolve({
          errcode: 0,
          errMessage: "update TTchuyenxe succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "TTchuyenxe not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllTTchuyenxe: getAllTTchuyenxe,
  CreateTTchuyenxe: CreateTTchuyenxe,
  deleteTTchuyenxe: deleteTTchuyenxe,
  updateTTchuyenxeData: updateTTchuyenxeData,
};
