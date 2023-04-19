import {createSlice} from "@reduxjs/toolkit"


const initialState ={
    name:"",
    id:"",
    email:"",
    mobile:"",
    image:"",


}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.name=action.payload.name;
            state.id=action.payload.id;
            state.email=action.payload.email;
            state.mobile=action.payload.mobile;
            state.image =action.payload.image;
            

        }
    }
})


export const { setUserDetails}= userSlice.actions;
export default userSlice.reducer;
