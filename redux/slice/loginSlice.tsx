import { TloginSchema } from "@/schemas/loginSchema";
import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunk/loginThunk";

interface loginState{
    data:TloginSchema | null,
    loading:boolean,
    error:string | null,
}

 const initialState:loginState={
    data:null,
    loading:false,
    error:null,
 }

 export const loginSlice = createSlice({
    name:"loginslice",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = true;
            state.data = action.payload;
            state.error = null;
          })
          .addCase(login.rejected, (state) => {
            state.loading = true;
            state.error = "Could not get room categories";
          });
      },
 })

 export default loginSlice.reducer;