import { createSlice } from "@reduxjs/toolkit";

const referralClaimRequestsSlice = createSlice({
    name: "referralClaimRequestsSlice",
    initialState: {
        claimRequests: [],
    },
    reducers: {
        setClaimRequests: (state, action) => {
            state.claimRequests = action.payload;
        },
        addClaimRequest: (state, action) => {
            state.claimRequests.push(action.payload);
        },
        editClaimRequest: (state, action) => {
            const idx = state.claimRequests.findIndex(
                (data) => data._id?.toString() === action?.payload?._id?.toString()
            );
            if (idx === -1) {
                return;
            }
            state.claimRequests[idx] = action.payload;
        },
        deleteClaimRequest: (state, action) => {
            const idx = state.claimRequests.findIndex(
                (data) => data._id?.toString() === action?.payload?.toString()
            );
            if (idx === -1) {
                return;
            }            
            state.claimRequests.splice(idx, 1);
        },
    },
});

export const { setClaimRequests, addClaimRequest, editClaimRequest, deleteClaimRequest } = referralClaimRequestsSlice.actions;
export default referralClaimRequestsSlice.reducer;