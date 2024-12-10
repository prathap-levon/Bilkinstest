import { createSlice } from "@reduxjs/toolkit";

const jobPageSlice = createSlice({
    name: "jobPageSlice",
    initialState: {
        jobs: [],
    },
    reducers: {
        addJobs: (state, action) => {
            state.jobs = action.payload;
        },
        addLike: (state, action) => {
            let idx = state?.jobs?.findIndex((item) => item?._id?.toString() === action.payload?.jobId?.toString());
            if (idx != -1) {
                state.jobs[idx] = {
                    ...state.jobs[idx],
                    likedBy: [...state.jobs[idx].likedBy, action.payload.userId]
                };
            }
        },
        removeLike: (state, action) => {
            let idx = state?.jobs?.findIndex((item) => item?._id?.toString() === action.payload?.jobId?.toString());
            if (idx != -1) {
                state.jobs[idx] = {
                    ...state.jobs[idx],
                    likedBy: state.jobs[idx].likedBy.filter((item) => item?.toString() !== action.payload?.userId?.toString())
                };
            }
        },
        addToSaved: (state, action) => {
            let idx = state?.jobs?.findIndex((item) => item?._id?.toString() === action.payload?.jobId?.toString());
            if (idx != -1) {
                state.jobs[idx].savedBy.push(action.payload.userId);
            }
        },
        removeFromSaved: (state, action) => {
            let idx = state?.jobs?.findIndex((item) => item?._id?.toString() === action.payload?.jobId?.toString());
            if (idx != -1) {
                state.jobs[idx].savedBy = state.jobs[idx].savedBy.filter((item) => item?.toString() !== action.payload?.userId?.toString());
            }
        }
    }
});

export const { addJobs, addLike, removeLike, addToSaved, removeFromSaved } = jobPageSlice.actions;
export default jobPageSlice.reducer;