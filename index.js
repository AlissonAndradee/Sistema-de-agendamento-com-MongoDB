const express = require("express");
const app     = express();
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");
const appointmentService = require("./services/AppointmentService");


app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/agendamento",{ useNewUrlParser: true, useUnifiedTopology: true})

app.get("/",(req,res) => {
    res.render("index")
})

app.get("/cadastro", (req, res) => {
    res.render("create")
})

app.post("/create", async(req,res) => {
    let { name,email,description,cpf,date,time } = req.body;
    
    var status = await appointmentService.Create(name,email,description,cpf,date,time)
    if(status){
        res.redirect("/");
    } else {
        res.status(404)
        res.send("Ocorreu uma falha!")        
    }
})

app.get("/getcalendar", async(req,res) => {
    var appointments = await appointmentService.GetAll(false);
    res.json(appointments);
})
app.listen(8080,() => {
    console.log("Rodando Servidor Agendamento")
})
