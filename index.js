require('dotenv').config();
const express =require('express');
const app = express();
var cors = require('cors')
const bodyparser = require('body-parser');
const port = process.env.PORT || 5000;
const monthlyRoute = require("./routes/monthlyRoutes");
const monthlyemi = require('./controllers/emicalculator');

app.use( bodyparser.urlencoded({ extended: true }) )
app.use(express.json());

app.use(cors())

app.use("/api/emi",monthlyemi);
app.all("*",(req,res)=>res.status(404).json({success:false,status:404}))


app.listen(port,()=>{
    console.log("listining to port"+ port);
})
