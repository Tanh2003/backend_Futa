import db from "../models/index";
let checkquyenhan = (input) => {
    return new Promise(async(resolve, reject) => {
        try {
            let quyenhan = await db.quyenhan.findOne({

                where: { tenquyen: input },

            });
            if (quyenhan) {
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

let getAllquyenhan = (quyenhanid) => {
    return new Promise(async(resolve, reject) => {
        try {
            let quyenhan = '';
            if (quyenhanid == 'ALL') {
                quyenhan = db.quyenhan.findAll({
                    // ẩn mật khẩu
                    order: [
                        ["createdAt", "DESC"]
                    ],


                })

            }
            if (quyenhanid && quyenhanid !== 'ALL') {
                quyenhan = await db.quyenhan.findOne({
                    where: { id: quyenhanid }, //  userId laf cais tham so truyen vao
                    // ẩn mật khẩu

                });

            }
            resolve(quyenhan)
        } catch (e) {
            reject(e);
        }
    })

}

let Createquyenhan = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // check quyenhan is exist??
            let check = await checkquyenhan(data.tenquyen);
            if (check == true) {
                resolve({
                    errcode: 1,
                    errMessage: "số quyenhan đã tồn tại vui lòng nhập số quyenhan  khác"
                })
            } else {

                await db.quyenhan.create({
                    tenquyen: data.tenquyen,
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
let deletequyenhan = (quyenhanId) => {
    return new Promise(async(resolve, reject) => {
        let quyenhan = await db.quyenhan.findOne({
            where: { id: quyenhanId }
        })
        if (!quyenhan) {
            resolve({
                errcode: 2,
                errMessage: "quyenhan isn't exist !"
            })
        }
        await db.quyenhan.destroy({
            where: { id: quyenhanId }
        });
        resolve({
            errcode: 0,
            errMessage: "quyenhan is deleted !"

        });
    })
}
let updatequyenhanData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errcode: 2,
                    errMessage: "Missing required parameter"
                })
            }
            let quyenhan = await db.quyenhan.findOne({
                where: { id: data.id },
                raw: false
            })
            if (quyenhan) {
                quyenhan.tenquyen = data.tenquyen;
               

                await quyenhan.save();

                resolve({
                    errcode: 0,
                    errMessage: "update ten quyen succeeds !"
                });
            } else {
                resolve({
                    errcode: 1,
                    errMessage: "quyenhan not found !"
                });
            }
        } catch (e) {
            reject(e)

        }
    })
}


module.exports = {
    getAllquyenhan: getAllquyenhan,
    Createquyenhan: Createquyenhan,
    deletequyenhan: deletequyenhan,
    updatequyenhanData: updatequyenhanData

}