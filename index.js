const express = require("express");
const app     = express();
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/agendamento",{ useNewUrlParser: true, useUnifiedTopology: true})

app.get("/",(req,res) => {
    res.render("create")
})

app.listen(5000,() => {
    console.log("Rodando Servidor Agendamento")
})
