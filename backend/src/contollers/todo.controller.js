import mongoose, { isValidObjectId } from "mongoose";
import { TodoDocument } from "../models/todoList.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTodoDocument=asyncHandler(async(req,res)=>{
    const {title,description}=req.body

    if([title,description].some((field)=>field?.trim()==="")){
        throw new ApiError(409,"all field required");
    }

    const todo=await TodoDocument.create({
        title,
        description,
        owner:req.user._id
    })

    return res.status(201).json(new ApiResponse(201,{todo},"Todo item create successfully"))
})

const fetchAllTodo=asyncHandler(async(req,res)=>{
    const todo=await TodoDocument.aggregate([
        {
            $match:{
                owner:new mongoose.Types.ObjectId(req.user._id)
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200,{todo},"All todos here"))
})

const updateTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    const { title, description } = req.body;

    if (!isValidObjectId(todoId)) {
        throw new ApiError(401, "Invalid todo id");
    }
    
    const todo = await TodoDocument.findById(todoId);

    if (todo?.owner.toString() != req.user?._id) {
        throw new ApiError(401, "Only the owner can update the record");
    }

    const updatedTodo = await TodoDocument.findByIdAndUpdate(
        todoId,
        {
            $set: {
                title: title,
                description: description || todo.description  // Update only if description is provided
            }
        },
        {
            new: true
        }
    );

    return res.status(201).json(new ApiResponse(200, { updatedTodo }, "Todo updated successfully"));
});

const deleteTodo=asyncHandler(async(req,res)=>{
    const {todoId}=req.params

    const todo=await TodoDocument.findById(todoId)


    if(todo?.owner.toString()!=req.user._id){
        throw new ApiError(401,"only admin can delete todo")
    }

    await TodoDocument.findByIdAndDelete(todoId)

    return res.status(200).json(new ApiResponse(200,{},"todo delete successfully"))
})


export {
    addTodoDocument,
    fetchAllTodo,
    updateTodo,
    deleteTodo
}