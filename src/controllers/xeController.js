import Xeservices from "../services/Xeservices";




let handleGetallxe = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            xe: []
        })

    }
    let xe = await Xeservices.getAllXe(id);
    console.log(xe);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OKe',
        xe

    })
}
let handleCreateNewXe = async(req, res) => {
    let message = await Xeservices.CreateXe(req.body);
    console.log(message);
    return res.status(200).json(message);

}




let handleDeleteXe = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let message = await Xeservices.deletexe(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditXe = async(req, res) => {
    let data = req.body;
    let message = await Xeservices.updateXeData(data);
    return res.status(200).json(message)

}



module.exports = {
    handleGetallxe: handleGetallxe,
    handleCreateNewXe: handleCreateNewXe,
    handleDeleteXe: handleDeleteXe,
    handleEditXe: handleEditXe



}