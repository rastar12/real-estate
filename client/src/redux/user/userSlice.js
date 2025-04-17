import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        sigInSuccess:(state ,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;

        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading=false;
        },
        deleteUserStart:(state)=>{
            state.loading=false;

        },
        deleteUserSuccess:(state)=>{
            state.loading=false;
            state.currentUser=null;
            state.error=null; 
    },
    deleteUserFailure:(state,action)=>{
        state.error=action.payload;
        state.loading=false;
    },
    signOutStart:(state)=>{
        state.loading=false;

    },
    signOutSuccess:(state)=>{
        state.loading=false;
        state.currentUser=null;
        state.error=null; 
},
signOutFailure:(state,action)=>{
    state.error=action.payload;
    state.loading=false;
},
}

});


export const {signInFailure,signInStart,sigInSuccess, updateUserFailure,updateUserSuccess,updateUserStart
,deleteUserFailure,deleteUserSuccess,deleteUserStart
,signOutFailure,signOutStart,signOutSuccess} =userSlice.actions;

export default userSlice.reducer;


