import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import specialtyController from "../controllers/specialtyController";
import XeController from "../controllers/xeController";
import taikhoanController from "../controllers/taikhoanController";

import khachhangController from "../controllers/khachhangController";
import nhanvienController from "../controllers/nhanvienController";
import VexeController from "../controllers/vexeController";
import ChuyenxeController from "../controllers/chuyenxeController";

import TTchuyenxeController from "../controllers/ttchuyenxe.Controller";

import ChitietchuyenxeController from "../controllers/chitietchuyenxeController";

 import QuyenhanController from "../controllers/quyenhanController";
 import emailController from "../controllers/emailController"

let router = express.Router();

let initWebRouters = (app) => {
  router.get("/", homeController.getHomePage); // gọi file controller và
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD); // link acction

  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  //api user
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUser);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  // api cua Xe

  router.get("/api/get-all-xe", XeController.handleGetallxe);
  router.post("/api/create-new-xe", XeController.handleCreateNewXe);
  router.put("/api/edit-xe", XeController.handleEditXe);
  router.delete("/api/delete-xe", XeController.handleDeleteXe);

  // api cua tai khoan
  router.post("/api/login/futa", taikhoanController.handleLogin);
  router.get("/api/get-all-taikhoan", taikhoanController.handleGetAlltaikhoan);
  router.get("/api/get-all-taikhoannhanvien", taikhoanController.laytatcataikhoannhanvien);
  router.get("/api/get-all-thongtintaikhoan", taikhoanController.laythongtintaikhoan);
  router.post(
    "/api/create-new-taikhoan",
    taikhoanController.handleCreateNewtaikhoan
  );
  router.put("/api/rePassword-taikhoan", taikhoanController.handleEdittaikhoan);
  router.delete(
    "/api/delete-taikhoan",
    taikhoanController.handleDeletetaikhoan
  );

  // api cua khachhang
  router.get(
    "/api/get-all-khachhang",
    khachhangController.handleGetAllkhachhang
  );
  router.post(
    "/api/create-new-khachhang",
    khachhangController.handleCreateNewkhachhang
  );
  router.put(
    "/api/edit-khachhang",
    khachhangController.handleEditkhachhang
  );
  router.delete(
    "/api/delete-khachhang",
    khachhangController.handleDeletekhachhang
  );
 // api cua  nhan vien
 router.get(
  "/api/get-all-nhanvien",
  nhanvienController.handleGetAllnhanvien
);
router.post(
  "/api/create-new-nhanvien",
  nhanvienController.handleCreateNewnhanvien
);
router.put(
  "/api/edit-nhanvien",
  nhanvienController.handleEditnhanvien
);
router.delete(
  "/api/delete-nhanvien",
  nhanvienController.handleDeletenhanvien
);



//api cua vexe 

router.get("/api/get-all-vexe", VexeController.handleGetallvexe);
router.post("/api/create-new-vexe", VexeController.handleCreateNewvexe);
router.put("/api/edit-vexe", VexeController.handleEditvexe);
router.delete("/api/delete-vexe", VexeController.handleDeletevexe);


//api cua chuyen xe
router.get("/api/get-all-chuyenxe", ChuyenxeController.handleGetallchuyenxe);
router.post("/api/create-new-chuyenxe", ChuyenxeController.handleCreateNewchuyenxe);
router.put("/api/edit-chuyenxe", ChuyenxeController.handleEditchuyenxe);
router.delete("/api/delete-chuyenxe", ChuyenxeController.handleDeletechuyenxe);



//api cua thong tin chuyen xe
router.get("/api/get-all-TTchuyenxe", TTchuyenxeController.handleGetallTTchuyenxe);
router.post("/api/create-new-TTchuyenxe", TTchuyenxeController.handleCreateNewTTchuyenxe);
router.put("/api/edit-TTchuyenxe", TTchuyenxeController.handleEditTTchuyenxe);
router.delete("/api/delete-TTchuyenxe", TTchuyenxeController.handleDeleteTTchuyenxe);



//api cua chitietchuyenxe

router.get("/api/get-all-Chitietchuyenxe", ChitietchuyenxeController.handleGetallchitietchuyenxe);
router.post("/api/create-new-Chitietchuyenxe", ChitietchuyenxeController.handleCreateNewchitietchuyenxe);
router.put("/api/edit-Chitietchuyenxe", ChitietchuyenxeController.handleEditchitietchuyenxe);
router.delete("/api/delete-Chitietchuyenxe", ChitietchuyenxeController.handleDeletechitietchuyenxe);






// api cua quyen han 

router.get("/api/get-all-quyenhan", QuyenhanController.handleGetallquyenhan);
router.post("/api/create-new-quyenhan", QuyenhanController.handleCreateNewquyenhan);
router.put("/api/edit-quyenhan", QuyenhanController.handleEditquyenhan);
router.delete("/api/delete-quyenhan", QuyenhanController.handleDeletequyenhan);




//api gui email
router.post(
  "/api/guiemail",
  emailController.emailcuaController
);






  // api cuar doctor

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctors", doctorController.postInfoDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );

  //api cua chuyen khoa
  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);

  // thêm  trang mới  khi /tanh
  router.get("/tanh", (req, res) => {
    return res.send("Hello world with NTanh");
  });

  return app.use("/", router);
};
module.exports = initWebRouters;
