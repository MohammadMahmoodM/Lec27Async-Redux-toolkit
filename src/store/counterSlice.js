import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const counterUpdate = createAsyncThunk(
    'counter/couterUpdate',
    async (value, thunkAPI)=> {
        const response = await fetch("http://localhost:3000/api/updatecounter")
        // {                        This is the method of sending data to server
        //     method: "post";
        //     body: {name: "hello"}
        // }
        const data = await response.json();
        return data;
    });

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0,
        isLoading: false,
        error: null
    },
    reducers: {
        increment: (state) => {
            state.count++;
        },
        decrement: (state) => {
            state.count--;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        }
    },
    extraReducers: {
        [counterUpdate.fulfilled]: (state, action) => {
            state.count+= action.payload;
            state.isLoading = false;
        },
        [counterUpdate.pending]: (state) => {
            state.isLoading = true;
        },
        [counterUpdate.rejected]: (state) => {      // if we have dynamic data then we will recive as (state,  action)
            state.isLoading = false;
            state.error= "Error in Update Counter"
        },
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;