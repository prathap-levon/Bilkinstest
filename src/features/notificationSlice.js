import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
    name: "notificationsSlice",
    initialState: {
        notifications: [],
        unReadCount: 0
    },
    reducers: {
        addAllNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        markAsRead: (state, action) => {
            state.notifications = state.notifications.map((item) => {
                item.isReaded = true;
                return item;
            });
        },
        setUnReadCount: (state, action) => {
            state.unReadCount = action.payload;
        },
        deleteNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                (data) => data._id?.toString() !== action.payload?.toString()
            );
        },
    },
});

export const { addAllNotifications, markAsRead, setUnReadCount, deleteNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
