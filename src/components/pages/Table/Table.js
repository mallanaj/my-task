import React, { useEffect } from 'react';

import {
	Paper,
	CircularProgress,
	Table as TableMui,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Box,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTablesData } from '../../../store/slice/TableSlice';

const Table = () => {
	const { tableHeaders, tableData, loadingTableData } = useSelector(
		(state) => state.table
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTablesData());
	}, [dispatch]);

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	if (loadingTableData) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress color="inherit" />
			</Box>
		);
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<TableMui stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{tableHeaders.map((column, index) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={
										index === 0
											? {
													minWidth: column.width,
													position: 'sticky',
													left: 0,
											  }
											: { minWidth: column.width }
									}
									sx={index === 0 ? { bgcolor: '#f5f5f5', color: 'black' } : {}}
								>
									{column.headerName}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								return (
									<TableRow hover tabIndex={-1} key={`${row.id}${index}`}>
										{tableHeaders.map((column, index) => {
											const isBool = column.boolean;
											return (
												<TableCell
													key={`${row.id}${index}`}
													align={column.align}
													style={
														index === 0
															? {
																	position: 'sticky',
																	left: 0,
															  }
															: {}
													}
													sx={
														index === 0
															? { bgcolor: '#f5f5f5', color: 'black' }
															: {}
													}
												>
													{isBool
														? row[column.field]
															? 'yes'
															: 'no'
														: row[column.field]}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</TableMui>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={tableData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default Table;
