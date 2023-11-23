// import bcryptjs from 'bcryptjs';
var bcrypt = require('bcryptjs');
import db from "../models/index";
import khachhang from "../models/khachhang";

const hashtaikhoanmatkhau = async (matkhau) => {
  const salt = await bcrypt.genSalt(10);
  const hashmatkhau = bcrypt.hashSync(matkhau, salt);
  return hashmatkhau;
};

const handletaikhoanLogin = async (sdt, matkhau) => {
  let taikhoanData = {};
  try {
    let isExist = await checktaikhoansdt(sdt);
    if (isExist) {
      let taikhoan = await db.taikhoan.findOne({
        attributes: ['sdt','matkhau','maquyen'],
        where: { sdt: sdt },
        raw: true,
      });

      if (taikhoan) {
        let check = bcrypt.compareSync(matkhau, taikhoan.matkhau);
        if (check) {
          taikhoanData.errcode = 0;
          taikhoanData.errMessage = "oke";
          delete taikhoan.matkhau;
          taikhoanData.taikhoan = taikhoan;
        } else {
          taikhoanData.errcode = 3;
          taikhoanData.errMessage = "Mật khẩu sai";
        }
      } else {
        taikhoanData.errcode = 2;
        taikhoanData.errMessage = "Người dùng không tồn tại";
      }
    } else {
      taikhoanData.errcode = 1;
      taikhoanData.errMessage = "sdt không tồn tại vui lòng đăng kí hoặc kiểm tra lại";
    }
    return taikhoanData;
  } catch (e) {
    // Xử lý lỗi tại đây nếu có
    throw e;
  }
};



let checktaikhoansdt=(sdt)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let taikhoan =await db.taikhoan.findOne({
               
                where: {sdt:sdt},
               
            });
            if(taikhoan){
                resolve(true);
            }else{
                resolve(false);
            }

        }catch(e){
            reject(e);

        }
    })
}

//taikhoanId là tham số truyền vào ví dụ id =1 hay  la 2 3 ......

let getAlltaikhoans =(taikhoanId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let taikhoans='';
            if(taikhoanId=='ALL'){
                taikhoans=db.taikhoan.findAll({
                    // ẩn mật khẩu
                    attributes:{
                        exclude:['matkhau']
                    },
                    include: [{
                        model: db.quyenhan,
                        as: 'idmaquyenData',
                        attributes: ['tenquyen', ],
                    }, ],
                    raw: true,
                    nest: true,

                })

            }
            if(taikhoanId && taikhoanId !== 'ALL')
            {
                taikhoans = await db.taikhoan.findOne({
                    where:{id:taikhoanId},//  taikhoanId laf cais tham so truyen vao
                     // ẩn mật khẩu
                     attributes:{
                        exclude:['matkhau']

                    }
                });
               
            }
            
            resolve(taikhoans)
        } catch (e) {
            reject(e);
        }
    })

}
let getAlltaikhoanNhanvien =(taikhoanId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let nhanvien='';
            if(taikhoanId=='ALL'){
                nhanvien=db.taikhoan.findAll({

                    where:{maquyen:4},
                    // ẩn mật khẩu
                    attributes:{
                        exclude:['matkhau']
                    },
                   

                })

            }
           
            resolve(nhanvien)
        } catch (e) {
            reject(e);
        }
    })

}
let getAllinfotaikhoan =(taikhoanId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let info='';
            if(taikhoanId!==""){
                info=db.khachhang.findOne({

                    where:{sdt:taikhoanId},
                    // ẩn mật khẩu
                    
                   

                })

            }
           
            resolve(info)
        } catch (e) {
            reject(e);
        }
    })

}

let CreateNewtaikhoan=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            // check sdt is exist??
            let check= await checktaikhoansdt(data.sdt);
            if(check==true){
                resolve({
                    errcode:1,
                    errMessage:"Số điện thoại đã tồn tại vui lòng nhập số điện thoại khác"
                })
            }else{
                let hashmatkhauFromBcrypt=await hashtaikhoanmatkhau(data.matkhau);
                await db.taikhoan.create({
                    sdt:data.sdt,
                    matkhau:hashmatkhauFromBcrypt,
                    maquyen:data.maquyen,
                });
                resolve({
                    errcode:0,
                    data:data
                })
    
                resolve({
                    errcode:0,
                    message:'OK'
                })
            }
        } catch (e) 
        {
            reject(e);
            
        }
    })
}
let deletetaikhoan =(taikhoanId)=>{
    return new Promise(async(resolve,reject)=>{
        let taikhoan =await db.taikhoan.findOne({
            where:{id:taikhoanId}
        })
        if(!taikhoan){
            resolve({
                errcode:2,
                errMessage:"the taikhoan isn't exist !"
            })
        }
        await db.taikhoan.destroy({
            where:{id:taikhoanId}
        });
        resolve({
            errcode:0,
            errMessage:"the taikhoan is deleted !"

        });
    })
}
let updatetaikhoanData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {

            if(!data.id){
                resolve({
                    errcode:2,
                    errMessage:"Missing required parameter"
                })
            }
            let taikhoan = await db.taikhoan.findOne({
                where:{id:data.id},
                raw:false
              })
              let hashmatkhauFromBcrypt=await hashtaikhoanmatkhau(data.matkhau);
              if(taikhoan){
                 taikhoan.sdt=data.sdt;
                taikhoan.matkhau=hashmatkhauFromBcrypt;
                await taikhoan.save();
                // await db.taikhoan.save({
                //     fistName:data.firstName,
                //     lastName:data.lastName,
                //     address:data.address,

                // }); //  muốn không bị lỗi TypeError: taikhoan.save is not a function thì vào config.json đổi raw: true --> false  là đc
                resolve({
                    errcode:0,
                    errMessage:"doi mk thanh cong"
                });
              }
              else{
                resolve({
                    errcode:1,
                    errMessage:"taikhoan's not found !"
                });         
              }
        } catch (e) {
            reject(e)
            
        }
    })
}


module.exports={
    handletaikhoanLogin : handletaikhoanLogin,
    getAlltaikhoans:getAlltaikhoans,
    CreateNewtaikhoan:CreateNewtaikhoan,
    deletetaikhoan:deletetaikhoan,
    updatetaikhoanData:updatetaikhoanData,
    getAlltaikhoanNhanvien:getAlltaikhoanNhanvien,
    getAllinfotaikhoan:getAllinfotaikhoan

}