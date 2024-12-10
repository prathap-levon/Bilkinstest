import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null, // Basic Details
        userDetail: null // For Job Seeker Profile Purpose
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setUserDetail: (state, action) => {
            state.userDetail = action.payload;
        }
    }
});

export const { setProfile, setUserDetail } = profileSlice.actions;
export default profileSlice.reducer;