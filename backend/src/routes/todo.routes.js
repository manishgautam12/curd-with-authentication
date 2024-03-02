import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { 
        addTodoDocument,
        deleteTodo, 
        fetchAllTodo, 
        updateTodo 
        } from "../contollers/todo.controller.js";

const router=Router();

router.route("/addTodoItem").post(verifyJWT,addTodoDocument)
router.route("/fetchAllTodo").get(verifyJWT,fetchAllTodo)
router.route("/updateTodo/:todoId").put(verifyJWT,updateTodo)
router.route("/deleteTodo/:todoId").delete(verifyJWT,deleteTodo)

export default router;