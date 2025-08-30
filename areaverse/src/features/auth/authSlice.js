import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const AUTH_BASE = "/auth";

// Thunk to register the user
export const registerUser = createAsyncThunk(
    "auth/signup",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post(`${AUTH_BASE}/signup`, userData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { error: "Sign up failed" })
        }
    }
);

// Thunk to log the user in.
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await api.post(`${AUTH_BASE}/login`, credentials);
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || { error: "Login failed" });
        }
    }
)

// Thunk to refresh the token.
export const refreshToken = createAsyncThunk(
    "auth/refresh",
    async (_, rejectWithValue) => {
        try {
            const res = await api.post(`${AUTH_BASE}/refresh`);
            return res.data.token;
        } catch (err) {
            rejectWithValue(err.response?.data || {error : "Refresh failed"});
        }
    }
)

// Thunk to log the user out of the system.
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async () => {
        await api.post(`${AUTH_BASE}/logout`);
        return null;
    }
)

// Auth slice.
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            }).addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            }).addCase(refreshToken.rejected, (state) => {
                state.user = null;
                state.token = null;
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }).addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            })
    },
});

export default authSlice.reducer;