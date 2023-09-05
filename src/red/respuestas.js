exports.success = function (req, res, mensaje, status){
    res.status(status).send({
        error: false,
        status: status,
        body: mensaje
    });
    
}

exports.error = function (req, res, mensaje, status){
    res.status(status).send({
        error: true,
        status: status,
        body: mensaje
    });
}