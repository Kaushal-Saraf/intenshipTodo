import express from "express"
import { home } from "../controllers/home"
import { fetchTodo } from "../controllers/fetchTodo"
import { addTodo } from "../controllers/addTodo"
import { markAsCompleted } from "../controllers/markAsCompleted"
import { deleteTodo } from "../controllers/deleteTodo"
import { deleteCompletedTodo } from "../controllers/deleteCompletedTodo"
import { sortByDeadline } from "../controllers/sortByDeadline"
const router = express.Router()
router.post('/',home)
router.get('/:id',fetchTodo).post('/:id',addTodo).patch('/:id',sortByDeadline).delete('/:id',deleteCompletedTodo)
router.patch('/:id/markAsCompleted',markAsCompleted)
router.patch('/:id/deleteTodo',deleteTodo)
export{
    router
}