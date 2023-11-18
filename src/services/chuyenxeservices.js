import db from "../models/index";
let getAllchuyenxe = (chuyenxeid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chuyenxe = "";
      if (chuyenxeid == "ALL") {
        chuyenxe = db.chuyenxe.findAll({
          // ẩn mật khẩu
          order: [["createdAt", "DESC"]],
          include: [{
            model: db.TTchuyenxe,
            as: 'idmachuyenData',
            attributes: ['thoigian','soluongve','ngay','id' ],
        }, ],
        raw: true,
        nest: true,
        });
        
      }
      if (chuyenxeid && chuyenxeid !== "ALL") {
        chuyenxe = await db.chuyenxe.findOne({
          where: { id: chuyenxeid }, //  userId laf cais tham so truyen vao
          include: [{
            model: db.TTchuyenxe,
            as: 'idmachuyenData',
            attributes: ['thoigian','soluongve','ngay','id' ],
        }, ],
        raw: true,
        nest: true,
          // ẩn mật khẩu
        });
      }
      resolve(chuyenxe);
    } catch (e) {
      reject(e);
    }
  });
};


let checkchuyenxe=(diemdi,diemden)=>{
  return new Promise(async(resolve,reject)=>{
      try{
          let user =await db.chuyenxe.findOne({
             
              where: {diemdi:diemdi, diemden:diemden},
             
          });
          if(user){
              resolve(true);
          }else{
              resolve(false);
          }

      }catch(e){
          reject(e);

      }
  })
}

let Createchuyenxe = (data) => {
  return new Promise(async (resolve, reject) => {
    try {

      let check= await checkchuyenxe(data.diemdi,data.diemden);
            if(check==true){
                resolve({
                    errcode:1,
                    errMessage:"chuyen di hoac chuyen den đã tồn tại vui lòng ghi chuyen khac khác"
                })
            }else{
              await db.chuyenxe.create({
                tenchuyen: data.tenchuyen,
                dodai: data.dodai,
                diemdi: data.diemdi,
                diemden: data.diemden,
                gia: data.gia,
              
              });
              
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
let deletechuyenxe = (chuyenxeId) => {
  return new Promise(async (resolve, reject) => {
    let chuyenxe = await db.chuyenxe.findOne({
      where: { id: chuyenxeId },
    });
    if (!chuyenxe) {
      resolve({
        errcode: 2,
        errMessage: "chuyenxe isn't exist !",
      });
    }
    await db.chuyenxe.destroy({
      where: { id: chuyenxeId },
    });
    resolve({
      errcode: 0,
      errMessage: "chuyenxe is deleted !",
    });
  });
};
let updatechuyenxeData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let chuyenxe = await db.chuyenxe.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (chuyenxe) {
        chuyenxe.tenchuyen= data.tenchuyen,
        chuyenxe.dodai= data.dodai,
        chuyenxe.diemdi= data.diemdi,
        chuyenxe.diemden= data.diemden,
        chuyenxe.gia= data.gia,

        await chuyenxe.save();

        resolve({
          errcode: 0,
          errMessage: "update chuyenxe succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "chuyenxe not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllchuyenxe: getAllchuyenxe,
  Createchuyenxe: Createchuyenxe,
  deletechuyenxe: deletechuyenxe,
  updatechuyenxeData: updatechuyenxeData,
};
