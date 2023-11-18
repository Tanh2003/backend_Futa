import chitietchuyenxeservices from "../services/chitietchuyenxe";




let handleGetallchitietchuyenxe = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            chitietchuyenxe: []
        })

    }
    let chitietchuyenxe = await chitietchuyenxeservices.getAllchitietchuyenxe(id);
    console.log(chitietchuyenxe);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OKe',
        chitietchuyenxe

    })
}
let handleCreateNewchitietchuyenxe = async(req, res) => {
    let message = await chitietchuyenxeservices.Createchitietchuyenxe(req.body);
    console.log(message);
    return res.status(200).json(message);

}




let handleDeletechitietchuyenxe = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let message = await chitietchuyenxeservices.deletechitietchuyenxe(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditchitietchuyenxe = async(req, res) => {
    let data = req.body;
    let message = await chitietchuyenxeservices.updatechitietchuyenxeData(data);
    return res.status(200).json(message)

}



module.exports = {
    handleGetallchitietchuyenxe: handleGetallchitietchuyenxe,
    handleCreateNewchitietchuyenxe: handleCreateNewchitietchuyenxe,
    handleDeletechitietchuyenxe: handleDeletechitietchuyenxe,
    handleEditchitietchuyenxe: handleEditchitietchuyenxe



}