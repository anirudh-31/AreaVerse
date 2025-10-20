import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

const FEED_BASE = "/feed";


export const getHomeFeed = createAsyncThunk(
    "feed/getHomeFeed",
    async ( { page, limit }, { rejectWithValue }) => {
        try {
            const res = await api.get(`${FEED_BASE}?page=${page}&limit=${limit}`);
            return res.data;
        }catch (err) {
            return rejectWithValue( {
                error: err.response?.data.error,
                status : err.response?.status
                } || { error: "Failed to retrieve posts" }
            )
        }
    }   
);

const feedSlice = createSlice({
    name: "homeFeed",
    initialState: {
        posts  : [],
        loading: false,
        error  : null,
        page   : 1,
        limit  : 10,
    },
    reducers: {
        
        swipe: (state) => {
            let temp    =  state.posts.slice(1);
            state.posts = [...temp]
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(getHomeFeed.pending, (state) => {
            state.loading = true;
            state.error   = null;
        })
        .addCase(getHomeFeed.fulfilled, (state, action) => {
            state.loading = false;
            state.posts   = [...state.posts, ...action.payload.data];
            state.page    = state.page + 1;
        })
        .addCase(getHomeFeed.rejected, (state, action) => {
            state.loading = false;
            state.error   = action.payload?.error || "Something went wrong";
        })
    } 
    
});

export const {
    swipe
} = feedSlice.actions;


export default feedSlice.reducer;