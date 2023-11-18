
import { emit } from "nodemon";
import db from "../models/index";





let checkkhachhangsdt=(sdt)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let taikhoan =await db.khachhang.findOne({
               
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




//khachhangId là tham số truyền vào ví dụ id =1 hay  la 2 3 ......

let getAllkhachhangs =(khachhangId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let khachhangs='';
            if(khachhangId=='ALL'){
                khachhangs=db.khachhang.findAll({
                    order:[["createdAt","DESC"]],
                })

            }
            if(khachhangId && khachhangId !== 'ALL')
            {
                khachhangs = await db.khachhang.findOne({
                    where:{id:khachhangId},//  khachhangId laf cais tham so truyen vao
                     // ẩn mật khẩu
                     
                });
               
            }
            resolve(khachhangs)
        } catch (e) {
            reject(e);
        }
    })

}

let CreateNewkhachhang=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            // check sdt is exist??

            let check= await checkkhachhangsdt(data.sdt);
            if(check==true){
                resolve({
                    errcode:1,
                    errMessage:"Số điện thoại đã tồn tại vui lòng nhập số điện thoại khác"
                })
            }else if(!data.email){
                resolve({
                    errcode:1,
                    errMessage:"vui lòng điền email"
                })
            }
            
            
            
            else{
                
                await db.khachhang.create({
                    sdt:data.sdt,
                   hoten:data.hoten,
                   diachi:data.diachi,
                   ngaysinh:data.ngaysinh,
                   gioitinh:data.gioitinh,
                   email:data.email,
                 
               
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
let deletekhachhang =(khachhangId)=>{
    return new Promise(async(resolve,reject)=>{
        let khachhang =await db.khachhang.findOne({
            where:{id:khachhangId}
        })
        if(!khachhang){
            resolve({
                errcode:2,
                errMessage:"the khachhang isn't exist !"
            })
        }
        await db.khachhang.destroy({
            where:{id:khachhangId}
        });
        resolve({
            errcode:0,
            errMessage:"the khachhang is deleted !"

        });
    })
}
let updatekhachhangData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {

            if(!data.sdt){
                resolve({
                    errcode:2,
                    errMessage:"vui lòng nhập đầy đủ các tham số"
                })
            }
            let khachhang = await db.khachhang.findOne({
                where:{sdt:data.sdt},
                raw:false
              })

              if(khachhang){
             khachhang.sdt=data.sdt;
             khachhang.hoten=data.hoten;
             khachhang.diachi=data.diachi;
             khachhang.ngaysinh=data.ngaysinh;
             khachhang.gioitinh=data.gioitinh;
             khachhang.email=data.email;
           
            
                await khachhang.save();
                resolve({
                    errcode:0,
                    errMessage:"cap nhat thanh cong"
                });
              }
              else{
                resolve({
                    errcode:1,
                    errMessage:"khachhang's not found !"
                });         
              }
        } catch (e) {
            reject(e)
            
        }
    })
}


module.exports={

    getAllkhachhangs:getAllkhachhangs,
    CreateNewkhachhang:CreateNewkhachhang,
    deletekhachhang:deletekhachhang,
    updatekhachhangData:updatekhachhangData,

}