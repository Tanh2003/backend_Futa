import taikhoanSevices from "../services/taikhoanservices";

let handleLogin=async(req,res)=>{
    let sdt =req.body.sdt;
    let matkhau=req.body.matkhau;
    //check sdt exist
    if(!sdt || !matkhau){
        return res.status(500).json({
            errcode: 1,
            message:'Vui lòng nhập đầy đủ thông tin'
        });
    }
   
    //compare matkhau
    
    // return taikhoanInfor
    //access_token:jWT JSON web token
    let taikhoanData = await taikhoanSevices.handletaikhoanLogin(sdt,matkhau);
    console.log(taikhoanData)
        return res.status(200).json({
            errcode: taikhoanData.errcode,
            message:taikhoanData.errMessage,
            taikhoan: taikhoanData.taikhoan ? taikhoanData.taikhoan:{}// check trên api in ra
          
          });
         
}
let handleGetAlltaikhoan =async(req,res)=>{
    let id=req.query.id;//all, id
    if(!id){
        return res.status(200).json({
            errcode:1,
            errMessage:'Missing require parameters',
            taikhoans:[]
        })
        
    }
       let taikhoans=await taikhoanSevices.getAlltaikhoans(id);
       console.log(taikhoans);
 return res.status(200).json({
    errcode:0,
    errMessage:'OK',
    taikhoans

 })
}
let laythongtintaikhoan =async(req,res)=>{
    let id=req.query.id;//all, id
    if(!id){
        return res.status(200).json({
            errcode:1,
            errMessage:'Missing require parameters',
            taikhoans:[]
        })
        
    }
       let info=await taikhoanSevices.getAllinfotaikhoan(id);
       console.log(info);
       return res.status(200).json({
    errcode:0,
    errMessage:'OK',
    info

 })
}
let laytatcataikhoannhanvien =async(req,res)=>{
    let id=req.query.id;//all, id
    if(!id){
        return res.status(200).json({
            errcode:1,
            errMessage:'Missing require parameters',
            taikhoans:[]
        })
        
    }
       let nhanviens=await taikhoanSevices.getAlltaikhoanNhanvien(id);
       console.log(nhanviens);
       return res.status(200).json({
    errcode:0,
    errMessage:'OK',
    nhanviens

 })
}
 let handleCreateNewtaikhoan= async(req,res)=>{
    let message=await taikhoanSevices.CreateNewtaikhoan(req.body);
    console.log(message);
    return res.status(200).json(message);

 }




 let handleDeletetaikhoan = async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errcode:1,
            errMessage:"Missing required parameters !"

        })
    }
    let message=await taikhoanSevices.deletetaikhoan(req.body.id);
    console.log(message);
    return res.status(200).json(message);
 }
 let handleEdittaikhoan = async(req,res)=>{
    let data= req.body;
   let message= await taikhoanSevices.updatetaikhoanData(data);
   return res.status(200).json(message)
    
 }

 
module.exports={
    handleLogin:handleLogin,
    handleGetAlltaikhoan:handleGetAlltaikhoan,
    handleCreateNewtaikhoan:handleCreateNewtaikhoan,
    handleEdittaikhoan:handleEdittaikhoan,
    handleDeletetaikhoan:handleDeletetaikhoan,
    laytatcataikhoannhanvien:laytatcataikhoannhanvien,
    laythongtintaikhoan:laythongtintaikhoan,

   
}