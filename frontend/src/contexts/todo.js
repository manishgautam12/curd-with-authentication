import { createContext,useContext } from "react";

export const TodoContext=createContext({
    apiStatus:true,
    setapiStatusTrue:()=>{},
    setapiStatusFalse:()=>{}
})

export const TodoProvider=TodoContext.Provider

export default function useTodo(){
    return useContext(TodoContext)
}