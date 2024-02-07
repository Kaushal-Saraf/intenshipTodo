import express, {Request,Response} from "express"
import { home } from "../controllers/users"
const router = express.Router()
router.post('/',home)
export{
    router
}