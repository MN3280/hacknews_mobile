
function dataErrors(err, req, res, next) {
    console.log(err);

    let code = 500
    let msg = `Internal server Error`
    //400 data tidak lengkap atau salah format
    //401 format dan data benar, tapi salah salah satu

    if (err.name === 'LoginError') {
        res.status(401).json({
            msg: 'Error login user not found atau password not matched'
        })
    } else if (err.name === "EmailRequired") {
        res.status(400).json({
            message: "Email must be insert!"
        })
    } else if (err.name === "PasswordRequired") {
        res.status(400).json({
            message: "Password must be insert!"
        })
    } else if (err.name === "EmailExisted") {
        res.status(400).json({
            message: "Email already exists"
        })
    } else if (err.name === 'SequelizeValidationError') {
        res.status(400).json({
            message: err.errors.map((er) => { er.message })
        })
    } else if (err.name === "Data not found") {
        res.status(404).json({
            message: "Data not found"
        })
    } else if (err.name === "Validation Error") {
        res.status(400).json({
            message: "Account Existed"
        })
    } else if (err.name === "Unauthorize") {
        res.status(403).json({
            message: 'Forbidden error di authorization'
        })
    } else if (err.name === "JsonWebTokenError") {
        res.status(401).json({
            message: 'Error authentication'
        })
    } else if (err.name === "nameLessThan3") {
        res.status(400).json({
            message: 'Tags minimum input must be 3'
        })
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            message: err.errors.map((er) => { er.message })
        })
    } else {
        res.status(code).json({
            error: msg,
        });
    }
}
module.exports = dataErrors