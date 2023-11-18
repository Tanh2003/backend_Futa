import vexeservices from "../services/vexeservices";




let handleGetallvexe = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            vexe: []
        })

    }
    let vexe = await vexeservices.getAllvexe(id);
    console.log(vexe);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OKe',
        vexe

    })
}
let handleCreateNewvexe = async(req, res) => {
    let message = await vexeservices.Createvexe(req.body);
    console.log(message);
    return res.status(200).json(message);

}




let handleDeletevexe = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let message = await vexeservices.deletevexe(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditvexe = async(req, res) => {
    let data = req.body;
    let message = await vexeservices.updatevexeData(data);
    return res.status(200).json(message)

}



module.exports = {
    handleGetallvexe: handleGetallvexe,
    handleCreateNewvexe: handleCreateNewvexe,
    handleDeletevexe: handleDeletevexe,
    handleEditvexe: handleEditvexe



}