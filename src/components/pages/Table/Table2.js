import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTablesData } from '../../../store/slice/TableSlice';

import { Box, CircularProgress } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

const Table2 = () => {
	const { tableHeaders, tableData, loadingTableData } = useSelector(
		(state) => state.table
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTablesData());
	}, [dispatch]);

	useEffect(() => {}, [tableData]);

	if (loadingTableData) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress color="inherit" />
			</Box>
		);
	}

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={tableData}
				columns={tableHeaders}
				pageSize={20}
				getRowId={() => 'Link'}
				rowsPerPageOptions={[100]}
			/>
		</div>
	);
};

export default Table2;
