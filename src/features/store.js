import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import jobsSlice from "./jobPageSlice";
import referralClaimRequestsSlice from "./referralClaimRequestsSlice";
import notificationsSlice from "./notificationSlice"
const store = configureStore({
    reducer: {
        profile: profileSlice,
        jobs: jobsSlice,
        referralClaimRequests: referralClaimRequestsSlice,
        notifications:notificationsSlice

    },
});

export default store;