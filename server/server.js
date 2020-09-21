require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/usuario/:id", (req, res) => {
    let id = req.params.id;

    res.json({
        id
    })

})

app.post("/usuario", (req, res) => {
    let body = req.body;

    res.json({
        persona: body
    })

})

app.put("/usuario", (req, res) => {
    res.send("hola mundo")

})

app.delete("/usuario", (req, res) => {
    res.send("hola mundo")

})

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT)
})