import { createSlice } from "@reduxjs/toolkit";

const faqSlice = createSlice({
    name: 'faqs',
    initialState: {
        faqs: []
    },
    reducers: {
        setFaqs: (state, action) => {
            state.faqs = action.payload;
        },
        addNewFaq: (state, action) => {
            state.faqs.push(action.payload);
        },
        editFaq: (state, action) => {
            const index = state.faqs.findIndex((faq) => faq._id === action.payload._id);
            if (index !== -1) state.faqs[index] = action.payload;
        },
        deleteFaq: (state, action) => {
            state.faqs = state.faqs.filter((faq) => faq._id !== action.payload);
        }
    }
});

export const { setFaqs, addNewFaq, editFaq, deleteFaq } = faqSlice.actions;
export default faqSlice.reducer;