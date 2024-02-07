import express, {Request,Response} from "express"
import { router } from "./routes/route"
import connects from "./config/db";
import bodyParser from "body-parser";
const cors = require('cors');

require('dotenv').config();
connects(process.env.MONGO_DB_URL)
const app = express()
app.use(bodyParser.json());
app.use(cors()); 
app.use("/",router)
app.listen(process.env.PORT,()=>{
    console.log(`server started...`)
})
