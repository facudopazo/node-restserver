const jwt = require('jsonwebtoken')
let validateToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.usuario = decoded.usuario;
        next();
    })
}

let verifyAdmin_Role = (req, res, next) => {
    let token = req.get('token');
    let usuario = req.usuario;
    if (usuario.role == "ADMIN_ROLE") {
        next()
    } else {
        res.status(401).json({
            err: { message: "You don't have admin role" }
        })
    }

}

module.exports = {
    validateToken,
    verifyAdmin_Role
}