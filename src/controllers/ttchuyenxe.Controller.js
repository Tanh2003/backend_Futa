import TTchuyenxeservices from "../services/ttchuyenxeservices";




let handleGetallTTchuyenxe = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            TTchuyenxe: []
        })

    }
    let TTchuyenxe = await TTchuyenxeservices.getAllTTchuyenxe(id);
    console.log(TTchuyenxe);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OKe',
        TTchuyenxe

    })
}
let handleCreateNewTTchuyenxe = async(req, res) => {
    let message = await TTchuyenxeservices.CreateTTchuyenxe(req.body);
    console.log(message);
    return res.status(200).json(message);

}




let handleDeleteTTchuyenxe = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let message = await TTchuyenxeservices.deleteTTchuyenxe(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditTTchuyenxe = async(req, res) => {
    let data = req.body;
    let message = await TTchuyenxeservices.updateTTchuyenxeData(data);
    return res.status(200).json(message)

}



module.exports = {
    handleGetallTTchuyenxe: handleGetallTTchuyenxe,
    handleCreateNewTTchuyenxe: handleCreateNewTTchuyenxe,
    handleDeleteTTchuyenxe: handleDeleteTTchuyenxe,
    handleEditTTchuyenxe: handleEditTTchuyenxe



}