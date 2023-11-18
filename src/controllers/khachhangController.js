import khachhangSevices from "../services/khachhangservices";


let handleGetAllkhachhang =async(req,res)=>{
    let id=req.query.id;//all, id
    if(!id){
        return res.status(200).json({
            errcode:1,
            errMessage:'Missing require parameters',
            khachhangs:[]
        })
        
    }
       let khachhangs=await khachhangSevices.getAllkhachhangs(id);
       console.log(khachhangs);
 return res.status(200).json({
    errcode:0,
    errMessage:'OK',
    khachhangs

 })
}
 let handleCreateNewkhachhang= async(req,res)=>{
    let message=await khachhangSevices.CreateNewkhachhang(req.body);
    console.log(message);
    return res.status(200).json(message);

 }




 let handleDeletekhachhang = async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errcode:1,
            errMessage:"Missing required parameters !"

        })
    }
    let message=await khachhangSevices.deletekhachhang(req.body.id);
    console.log(message);
    return res.status(200).json(message);
 }
 let handleEditkhachhang = async(req,res)=>{
    let data= req.body;
   let message= await khachhangSevices.updatekhachhangData(data);
   return res.status(200).json(message)
    
 }

 
module.exports={
   
    handleGetAllkhachhang:handleGetAllkhachhang,
    handleCreateNewkhachhang:handleCreateNewkhachhang,
    handleEditkhachhang:handleEditkhachhang,
    handleDeletekhachhang:handleDeletekhachhang,

   
}