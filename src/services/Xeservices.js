import db from "../models/index";







let checkSoXe = (input) => {
    return new Promise(async(resolve, reject) => {
        try {
            let soxe = await db.xe.findOne({

                where: { soxe: input },

            });
            if (soxe) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (e) {
            reject(e);

        }
    })
}

//userId là tham số truyền vào ví dụ id =1 hay  la 2 3 ......

let getAllXe = (xeid) => {
    return new Promise(async(resolve, reject) => {
        try {
            let xe = '';
            if (xeid == 'ALL') {
                xe = db.xe.findAll({
                    // ẩn mật khẩu
                    order: [
                        ["createdAt", "DESC"]
                    ],


                })

            }
            if (xeid && xeid !== 'ALL') {
                xe = await db.xe.findOne({
                    where: { id: xeid }, //  userId laf cais tham so truyen vao
                    // ẩn mật khẩu

                });

            }
            resolve(xe)
        } catch (e) {
            reject(e);
        }
    })

}

let CreateXe = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // check soxe is exist??
            let check = await checkSoXe(data.soxe);
            if (check == true) {
                resolve({
                    errcode: 1,
                    errMessage: "số xe đã tồn tại vui lòng nhập số xe  khác"
                })
            } else {

                await db.xe.create({
                    soxe: data.soxe,
                    loaixe: data.loaixe,
                    manv: data.manv
                });

                resolve({
                    errcode: 0,
                    data: data
                })

                resolve({
                    errcode: 0,
                    message: 'OK'
                })
            }



        } catch (e) {
            reject(e);

        }
    })
}
let deletexe = (xeId) => {
    return new Promise(async(resolve, reject) => {
        let xe = await db.xe.findOne({
            where: { id: xeId }
        })
        if (!xe) {
            resolve({
                errcode: 2,
                errMessage: "xe isn't exist !"
            })
        }
        await db.xe.destroy({
            where: { id: xeId }
        });
        resolve({
            errcode: 0,
            errMessage: "xe is deleted !"

        });
    })
}
let updateXeData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errcode: 2,
                    errMessage: "Missing required parameter"
                })
            }
            let xe = await db.xe.findOne({
                where: { id: data.id },
                raw: false
            })
            if (xe) {
                xe.soxe = data.soxe;
                xe.loaixe = data.loaixe;
                xe.manv = data.manv;

                await xe.save();

                resolve({
                    errcode: 0,
                    errMessage: "update xe succeeds !"
                });
            } else {
                resolve({
                    errcode: 1,
                    errMessage: "xe not found !"
                });
            }
        } catch (e) {
            reject(e)

        }
    })
}


module.exports = {
    getAllXe: getAllXe,
    CreateXe: CreateXe,
    deletexe: deletexe,
    updateXeData: updateXeData

}