import express from "express"
import { home } from "../controllers/home"
import { fetchTodo } from "../controllers/fetchTodo"
import { addTodo } from "../controllers/addTodo"
const router = express.Router()
router.post('/',home)
router.get('/:id',fetchTodo)
router.post('/:id',addTodo)
export{
    router
}