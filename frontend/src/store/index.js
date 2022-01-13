import {createSlice, configureStore} from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice';

const authSlice=createSlice({
    name:'authentication',
    initialState:{isAuthenticated:false},
    reducers:{
       login(state){state.isAuthenticated=true; },
       logout(state){state.isAuthenticated=false;}
    }
  });

const store=configureStore({
    reducer: { auth: authSlice.reducer, tasks: tasksSlice.reducer}
});

export const authAction=authSlice.actions;

export default store;