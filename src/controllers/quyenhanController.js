import quyenhanservices from "../services/quyenhanservices";




let handleGetallquyenhan = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            quyenhan: []
        })

    }
    let quyenhan = await quyenhanservices.getAllquyenhan(id);
    console.log(quyenhan);
    return res.status(200).json({
        errcode: 0,
        errMessage: 'OKe',
        quyenhan

    })
}
let handleCreateNewquyenhan = async(req, res) => {
    let message = await quyenhanservices.Createquyenhan(req.body);
    console.log(message);
    return res.status(200).json(message);

}




let handleDeletequyenhan = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let message = await quyenhanservices.deletequyenhan(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditquyenhan = async(req, res) => {
    let data = req.body;
    let message = await quyenhanservices.updatequyenhanData(data);
    return res.status(200).json(message)

}



module.exports = {
    handleGetallquyenhan: handleGetallquyenhan,
    handleCreateNewquyenhan: handleCreateNewquyenhan,
    handleDeletequyenhan: handleDeletequyenhan,
    handleEditquyenhan: handleEditquyenhan



}