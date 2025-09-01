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

const userSlice = createSlice({
    name: "user",
    initialState: {
        userDetails: null,
        loading: false,
        error: null
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
    }
});

export default userSlice.reducer;