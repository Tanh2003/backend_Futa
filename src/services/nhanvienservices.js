import db from "../models/index";

//nhanvienId là tham số truyền vào ví dụ id =1 hay  la 2 3 ......

let getAllnhanviens = (nhanvienId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nhanviens = "";
      if (nhanvienId == "ALL") {
        nhanviens = db.nhanvien.findAll({
            order:[["createdAt","DESC"]],
            include: [{
                model: db.taikhoan,
                as: 'idmatkData',
                attributes: ['sdt', ],
            }, ],
            raw: true,
            nest: true,

        });
      }
      if (nhanvienId && nhanvienId !== "ALL") {
        nhanviens = await db.nhanvien.findOne({
          where: { id: nhanvienId }, //  nhanvienId laf cais tham so truyen vao
          // ẩn mật khẩu
        });
      }
      resolve(nhanviens);
    } catch (e) {
      reject(e);
    }
  });
};

let CreateNewnhanvien = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check sdt is exist??

      await db.nhanvien.create({
        hoten: data.hoten,
        diachi: data.diachi,
        ngaysinh: data.ngaysinh,
        gioitinh: data.gioitinh,
        matk: data.matk,
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
let deletenhanvien = (nhanvienId) => {
  return new Promise(async (resolve, reject) => {
    let nhanvien = await db.nhanvien.findOne({
      where: { id: nhanvienId },
    });
    if (!nhanvien) {
      resolve({
        errcode: 2,
        errMessage: "the nhanvien isn't exist !",
      });
    }
    await db.nhanvien.destroy({
      where: { id: nhanvienId },
    });
    resolve({
      errcode: 0,
      errMessage: "the nhanvien is deleted !",
    });
  });
};
let updatenhanvienData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let nhanvien = await db.nhanvien.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (nhanvien) {
        nhanvien.hoten = data.hoten;
        nhanvien.diachi = data.diachi;
        nhanvien.ngaysinh = data.ngaysinh;
        nhanvien.gioitinh = data.gioitinh;

        await nhanvien.save();
        resolve({
          errcode: 0,
          errMessage: "cap nhat thanh cong",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "nhanvien's not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllnhanviens: getAllnhanviens,
  CreateNewnhanvien: CreateNewnhanvien,
  deletenhanvien: deletenhanvien,
  updatenhanvienData: updatenhanvienData,
};
