import { createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL as url } from '../../utils/constants';
import { generateRandomId } from '../../utils/util';

import tableHeaders from '../../mock-data/tableHeaders.js';

const initialState = {
	tableHeaders: tableHeaders,
	tableData: [],
	loadingTableData: false,
};
const tableSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {
		setTablesData(state, actions) {
			state.tableData = actions.payload;
		},
		loadingData(state) {
			state.loadingTableData = !state.loadingTableData;
		},
	},
});

// Thunk fn
const fetchTablesData = () => {
	return async (dispatch) => {
		dispatch(TableActions.loadingData());
		try {
			let resp = await fetch(url);
			resp = await resp.json();
			resp = generateRandomId(resp.entries);
			dispatch(TableActions.setTablesData(resp));
			dispatch(TableActions.loadingData());
		} catch (error) {
			dispatch(TableActions.loadingData());
		}
	};
};

// Generate id for each row
// function genId(data) {
// 	const res = data.map((row) => {
// 		return { ...row, id: `id${Math.random().toString(16).slice(2)}` };
// 	});
// 	return res;
// }

const TableActions = tableSlice.actions;
export { TableActions, fetchTablesData };

export default tableSlice.reducer;
