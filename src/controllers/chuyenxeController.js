import chuyenxeservices from "../services/chuyenxeservices";




let handleGetallchuyenxe = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            chuyenxe: []
        })

    }
    let chuyenxe = await chuyenxeservices.getAllchuyenxe(id);
    console.log(chuyenxe);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OKe',
        chuyenxe

    })
}
let handleCreateNewchuyenxe = async(req, res) => {
    let message = await chuyenxeservices.Createchuyenxe(req.body);
    console.log(message);
    return res.status(200).json(message);

}




let handleDeletechuyenxe = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let message = await chuyenxeservices.deletechuyenxe(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditchuyenxe = async(req, res) => {
    let data = req.body;
    let message = await chuyenxeservices.updatechuyenxeData(data);
    return res.status(200).json(message)

}



module.exports = {
    handleGetallchuyenxe: handleGetallchuyenxe,
    handleCreateNewchuyenxe: handleCreateNewchuyenxe,
    handleDeletechuyenxe: handleDeletechuyenxe,
    handleEditchuyenxe: handleEditchuyenxe



}