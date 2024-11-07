import { doPost } from "@/lib/axios";
import { TloginSchema } from "@/schemas/loginSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login=createAsyncThunk<any,{
    data:TloginSchema,
}>("login",async({data})=>{
    try{
        const response = await doPost('/test/login',data)
        return response;
    }
    catch(error){
        throw error;
    }
})