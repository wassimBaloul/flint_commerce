import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated : false,
    isLoading : true,
    user : null
}

export const userSignup = createAsyncThunk('/auth/signup',
    async(formData) => {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/signup`,formData,{
            withCredentials : true
        });
        return res.data;
    }
)

export const userLogin = createAsyncThunk('/auth/login',
    async(formData) => {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/login`,formData,{
            withCredentials : true
        });
        return res.data;
    }
)

export const verifyAuth = createAsyncThunk('/auth/verifyAuth',
    async(token) => {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/verifyAuth`,{
            withCredentials : true,
            headers : {
            Authorization : `Bearer ${token}`,
            "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
            }
        });
        return res.data;
    }
)

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        resetAuthentication : (state) => {
            state.isAuthenticated = false,
            state.user = null,
            state.isLoading = false,
            localStorage.removeItem("flint_token")
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(userSignup.pending , (state) => {
            state.isLoading = true
        })
        .addCase(userSignup.fulfilled , (state,action) => {
            state.isAuthenticated = false
            state.isLoading = false,
            state.user = null
        })
        .addCase(userSignup.rejected , (state) => {
            state.isAuthenticated = false
            state.isLoading = false,
            state.user = null
        })
        .addCase(userLogin.pending , (state) => {
            state.isLoading = true
        })
        .addCase(userLogin.fulfilled , (state,action) => {
            state.isAuthenticated = action.payload.success ? true : false
            localStorage.setItem("flint_token",action.payload?.token)
            state.isLoading = false,
            state.user = action.payload.success ? action.payload.user : null
        })
        .addCase(userLogin.rejected , (state) => {
            state.isAuthenticated = false
            state.isLoading = false,
            state.user = null
        })
        .addCase(verifyAuth.pending , (state) => {
            state.isLoading = true
        })
        .addCase(verifyAuth.fulfilled , (state,action) => {
            state.isAuthenticated = action.payload.success ? true : false
            state.isLoading = false,
            state.user = action.payload.success ? action.payload.user : null
        })
        .addCase(verifyAuth.rejected , (state) => {
            state.isAuthenticated = false
            state.isLoading = false,
            state.user = null
        })
    }
})

export const {resetAuthentication} = authSlice.actions;
export default authSlice.reducer;