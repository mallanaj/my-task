import { createSlice } from '@reduxjs/toolkit';

import { createTheme } from '@mui/material/styles';

const initialState = {
	darkTheme: false,
};
const settingSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		toggleTheme(state) {
			state.darkTheme = !state.darkTheme;
		},
	},
});

// Thunk fn
const fetchTasksThunk = () => {
	return async (dispatch) => {};
};

const SettingActions = settingSlice.actions;
export { SettingActions, fetchTasksThunk };

export default settingSlice.reducer;
