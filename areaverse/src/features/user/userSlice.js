import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/axios";

const USER_BASE = "/user"

// Thunk to fetch the user details.
export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(`${USER_BASE}/me`);
            return res.data;
        } catch (err) {
            return rejectWithValue( {
                error: err.response?.data.error,
                status : err.response?.status
            } || { error: "Sign up failed" })
        }
    }
)

export const getUserPosts = createAsyncThunk(
    "user/getUserPosts",
    async ({userId, page}, {rejectWithValue}) => {
        try {
            const res = await api.get(`${USER_BASE}/${userId}/posts?page=${page}&limit=3`);
            return res.data;
        } catch (err) {
            return rejectWithValue( {
                error: err.response?.data.error,
                status : err.response?.status
            } || { error: "Failed to retrieve user posts" })
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        userDetails  : null,
        loading      : false,
        error        : null,
        fetchingPosts: false,
        userPosts    : null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userDetails = action.payload
        })
        .addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.error || "Something went wrong";
        })
        .addCase(getUserPosts.pending, (state, action) => {
            state.fetchingPosts = true;
        })
        .addCase(getUserPosts.fulfilled, (state, action) => {
            state.fetchingPosts = false
            state.userPosts     = action.payload;
        })
        .addCase(getUserPosts.rejected, (state, action) => {
            state.fetchingPosts = false;
            state.error         = action.payload?.error || "Something went wrong";
        })
    }
});

export default userSlice.reducer;