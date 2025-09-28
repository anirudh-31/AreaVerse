import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const IMAGE_BASE = "/image"
const POST_BASE  = "/report"
// Thunk to create signed upload URL's for images.
export const getSignedImageURL = createAsyncThunk(
    "post/createSignedURL",
    async ({fileName, fileType}, {rejectWithValue}) => {
        try{
            const response =  await api.post(`${IMAGE_BASE}/get-signed-upload-url`, {
                fileName,
                fileType
            });
            return response.data;
        }catch (err) {
            return rejectWithValue({
                error : err.response?.data.error,
                status: err.response?.status
            }) || { error: "Failed to create signed upload URL"}
        }
    }
);

export const createNewPost = createAsyncThunk(
    "post/createNewReport",
    async (post, {rejectWithValue}) => {
        try {
            const response = await api.post(`${POST_BASE}/create-new-report`, post);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                error : error.response?.data.error,
                status: error.response?.status
            }) || { error: "Failed to create report"}
        }
    }
)

export const updatePost = createAsyncThunk(
    "post/updateReport",
    async ({ postId, title, description, images }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`${POST_BASE}/${postId}`, {
                title,
                description,
                images
            })
            return response.data;
        } catch (error) {
             return rejectWithValue({
                error : error.response?.data.error,
                status: error.response?.status
            }) || { error: "Failed to update report"}
        }
    }
)

export const retrievePost = createAsyncThunk(
    "post/retrievePost",
    async (postId, {rejectWithValue}) => {
        try{
            const  response = await api.get(`${POST_BASE}/${postId}`);
            return response.data;
        } catch(error){
            return rejectWithValue({
                error : error.response?.data.error,
                status: error.response?.status
            }) || { error: "Failed to retrieve report"}
        }
    }
)

export const fetchReviewReports = createAsyncThunk(
    "post/retrieveReviewPost",
    async ({ pageId, pageSize }, {rejectWithValue} ) => {
        try {
            const response = await api.get(`${POST_BASE}/review-queue?page=${pageId}&pageSize=${pageSize}`);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                error : error.response?.data.error,
                status: error.response?.status
            }) || { error: "Failed to retrieve report"}
        }
    }
)

const postSlice = createSlice({
    name        : "post",
    initialState: {
        loading           : false,
        uploading         : false,
        retrieving        : false,
        retrievingReview  : false,
        postsForReview    : null,
        post              : null,
        error             : null,
        imageUploadError  : null,
        retieveError      : null,
        retieveReviewError: null,
        updating          : false,
        updateError       : null,
    },
    reducers: {
        resetPostState(state) {
            state.loading          = false;
            state.uploading        = false;
            state.retrieving       = false;
            state.retrievingReview = false;
            state.postsForReview   = false;
            state.post             = null;
            state.error            = null;
            state.imageUploadError = null;
            state.retieveError     = null;
            state.updating         = false;
            state.updateError      = null;
        }
    },
    extraReducers: (builder) => {
        // start retrieving signed URL's
        builder.addCase(getSignedImageURL.pending, (state) => {
            state.uploading        = true;
            state.imageUploadError = false;
            state.retrieving       = false;
        })
        // complete retrieving signed URL's
        .addCase(getSignedImageURL.fulfilled, (state) => {
            state.uploading = false;
        })
        // failure during retrieving signed URL's
        .addCase(getSignedImageURL.rejected, (state, action) => {
            state.uploading        = false;
            state.imageUploadError = action.payload
        })
        // starting creating new report
        .addCase(createNewPost.pending, (state) => {
            state.loading = true;
        })
        // complete creating new report
        .addCase(createNewPost.fulfilled, (state) => {
            state.loading = false;
        })
        // failure during report creation
        .addCase(createNewPost.rejected, (state, action) => {
            state.loading = false;
            state.error   = action.payload
        })
        // start retrieving report
        .addCase(retrievePost.pending, (state, action) => {
            state.retrieving = true;
        })
        // complete retrieving report
        .addCase(retrievePost.fulfilled, (state, action) => {
            state.retrieving = false;
            state.post       = action.payload;
        })
        // failure during report retrieval
        .addCase(retrievePost.rejected, (state, action) => {
            state.retrieving   = false;
            state.retieveError = action.payload
        })
        // start retrieving reports for review.
        .addCase(fetchReviewReports.pending, (state, action) => {
            state.retrievingReview = true;
        })
        // complete retrieving reports for review
        .addCase(fetchReviewReports.fulfilled, (state, action) => {
            state.retrievingReview = false;
            state.postsForReview   = action.payload;
        })
        // failure during report retrieval
        .addCase(fetchReviewReports.rejected, (state, action) => {
            state.retrievingReview   = false;
            state.retieveReviewError = action.payload
        })
        // start retrieving reports for review.
        .addCase(updatePost.pending, (state, action) => {
            state.updating = true;
        })
        // complete retrieving reports for review
        .addCase(updatePost.fulfilled, (state, action) => {
            state.updating = false;
        })
        // failure during report retrieval
        .addCase(updatePost.rejected, (state, action) => {
            state.updating = false;
            state.updating = action.payload
        })
    }
})

export const { resetPostState } = postSlice.actions;
export default postSlice.reducer;