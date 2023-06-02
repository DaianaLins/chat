const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const useRoutes = require("./routes/userRoutes")


const app = express()
require("dotenv").config()


app.use(cors());
app.use(express.json());

app.use("/api/auth", useRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB conectado com sucesso!")
}).catch((err)=>{
    console.log(err.message)
})

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server rodando na porta ${process.env.PORT}`)
})