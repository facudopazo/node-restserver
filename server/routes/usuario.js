const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');

app.get("/usuario", (req, res) => {
    let id = req.params.id;
    let base = req.query.base || 0;
    let range = req.query.range || 5;
    base = Number(base);
    range = Number(range)
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(base)
        .limit(range)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, count) => {

                res.json({
                    ok: true,
                    usuarios,
                    count
                })
            })
        }
        )



})

app.post("/usuario", (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put("/usuario/:id", (req, res) => {
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    let id = req.params.id
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.delete("/usuario/:id", (req, res) => {
    let id = req.params.id
    // let body = _.pick(req.body, ['estado'])
    let disabledUSer = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, disabledUSer, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }
    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: "Usuariono encontrado"
    //         })
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     })
    // })

})


module.exports = app;