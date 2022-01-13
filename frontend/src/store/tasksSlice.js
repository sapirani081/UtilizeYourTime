import { createSlice } from "@reduxjs/toolkit";

const tasksSlice=createSlice({
    name:'tasks',
    initialState: {
        tasks: [],
        totalQuantity: 0,
        changed:false
    },
    reducers: {
        replaceTasks(state, action) {
          state.totalQuantity = action.payload.totalQuantity;
          state.tasks = action.payload.tasks;
        },
        addTask(state,action){
            const taskToAdd=action.payload;
            state.totalQuantity++;
            state.changed=true;
            state.tasks.push({
                id: taskToAdd.id, 
                name:taskToAdd.title,
                date: taskToAdd.date,
                description: taskToAdd.description,
                urgency: taskToAdd. urgency,
                checked: taskToAdd.checked});
        },
        removeTask(state,action){
            const id=action.payload;
            const existingTask=state.tasks.find(task=>task.id===id);
            state.changed=true;
            state.tasks=state.tasks.filter(task=> task.id!==id);
    }
}
});

export const tasksAction=tasksSlice.actions;
export default tasksSlice;