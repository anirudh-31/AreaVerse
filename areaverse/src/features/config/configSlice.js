import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name       : 'config',
    initialState: {
        displaySearchPanel: false
    },
    reducers: {
        toggleSearchPanelDisplay: (state) => {
            state.displaySearchPanel = !state.displaySearchPanel;
        }
    }
})

export const {
    toggleSearchPanelDisplay
} = configSlice.actions;

export default configSlice.reducer;