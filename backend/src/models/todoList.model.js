import {mongoose, Schema} from "mongoose";

const todoDocumentSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const TodoDocument=mongoose.model("TodoDocument",todoDocumentSchema)