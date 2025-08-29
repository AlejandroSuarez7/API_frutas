import express from "express";
import mongoose from "mongoose";//conectar a la base de datos mongoDB
import cors from "cors";//seguridad del servidor con esta libreria
import dotenv from "dotenv";
//librerias que se descargaron en la terminal


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//conexion a mongo db atlas
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Conectado a mongoDB Atlas"))
    .catch(err => console.log("Error conectado a MongoDB:",err));

const frutaSchema = new mongoose.Schema({
    "nombre":{type:String, required:true},
    "precio":{type:Number, required:true},
    "estado":{type:Boolean, required:true},
}); 

const Fruta= mongoose.model("Fruta",frutaSchema);

//metodos Metodo http
//Consultar todos los metodos
app.get("/frutas",async(req,res)=>{
    const frutas = await Fruta.find();
    res.json(frutas)
});

//consultar por el id
app.get("/frutas/:id",async(req,res)=>{
    const frutas = await Fruta.findById(req.params.id);
    res.json(frutas)
});


//metodo para insertar
app.post("/frutas",async(req,res)=>{
    const nuevaFruta = new Fruta(req.body);
    await nuevaFruta.save();
    res.status(201).json(nuevaFruta);
});
//metodo para actualizar 

app.put("/frutas/:id",async(req,res)=>{
    const frutaModificada =await Fruta.findByIdAndUpdate(req.params.id, req.body, {new:true});//modificar
    res.status(202).json(frutaModificada);
});

//metodo para eliminar un documento
app.delete("/frutas/:id",async(req,res)=>{
    await Fruta.findByIdAndDelete(req.params.id);
    res.status(204).end();
});
//=================================================================================================
app.listen(process.env.PORT,()=>{ //llama al puerto del archivo .env llamado pPORT que conecta con la base de datos
        console.log(`Servidor en ejecucion: http://localhost:${process.env.PORT}`)
    })