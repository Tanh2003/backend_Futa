import nhanvienSevices from "../services/nhanvienservices";


let handleGetAllnhanvien =async(req,res)=>{
    let id=req.query.id;//all, id
    if(!id){
        return res.status(200).json({
            errcode:1,
            errMessage:'Missing require parameters',
            nhanviens:[]
        })
        
    }
       let nhanviens=await nhanvienSevices.getAllnhanviens(id);
       console.log(nhanviens);
 return res.status(200).json({
    errcode:0,
    errMessage:'OK',
    nhanviens

 })
}

 let handleCreateNewnhanvien= async(req,res)=>{
    let message=await nhanvienSevices.CreateNewnhanvien(req.body);
    console.log(message);
    return res.status(200).json(message);

 }




 let handleDeletenhanvien = async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errcode:1,
            errMessage:"Missing required parameters !"

        })
    }
    let message=await nhanvienSevices.deletenhanvien(req.body.id);
    console.log(message);
    return res.status(200).json(message);
 }
 let handleEditnhanvien = async(req,res)=>{
    let data= req.body;
   let message= await nhanvienSevices.updatenhanvienData(data);
   return res.status(200).json(message)
    
 }

 
module.exports={
   
    handleGetAllnhanvien:handleGetAllnhanvien,
    handleCreateNewnhanvien:handleCreateNewnhanvien,
    handleEditnhanvien:handleEditnhanvien,
    handleDeletenhanvien:handleDeletenhanvien,

   
}