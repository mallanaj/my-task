// import * as React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';

// const Search = styled('div')(({ theme }) => ({
// 	position: 'relative',
// 	borderRadius: theme.shape.borderRadius,
// 	backgroundColor: alpha(theme.palette.common.white, 0.15),
// 	'&:hover': {
// 		backgroundColor: alpha(theme.palette.common.white, 0.25),
// 	},
// 	marginLeft: 0,
// 	width: '100%',
// 	[theme.breakpoints.up('sm')]: {
// 		marginLeft: theme.spacing(1),
// 		width: 'auto',
// 	},
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
// 	padding: theme.spacing(0, 2),
// 	height: '100%',
// 	position: 'absolute',
// 	pointerEvents: 'none',
// 	display: 'flex',
// 	alignItems: 'center',
// 	justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
// 	color: 'inherit',
// 	'& .MuiInputBase-input': {
// 		padding: theme.spacing(1, 1, 1, 0),
// 		// vertical padding + font size from searchIcon
// 		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// 		transition: theme.transitions.create('width'),
// 		width: '100%',
// 		[theme.breakpoints.up('sm')]: {
// 			width: '12ch',
// 			'&:focus': {
// 				width: '20ch',
// 			},
// 		},
// 	},
// }));

// const SearchBar = () => {
// 	return (
// 		<Box sx={{ flexGrow: 1 }}>
// 			<Search>
// 				<SearchIconWrapper>
// 					<SearchIcon />
// 				</SearchIconWrapper>
// 				<StyledInputBase
// 					placeholder="Search…"
// 					inputProps={{ 'aria-label': 'search' }}
// 				/>
// 			</Search>
// 		</Box>
// 	);
// };

// export default SearchBar;

import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchCardsData, CardActions } from '../../store/slice/CardSlice';

function sleep(delay = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

export default function SearchBar() {
	const [value, setValue] = useState(null);
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;

	const dispatch = useDispatch();
	const data = useSelector((state) => state.card.cardsData);
	const router = useHistory();

	useEffect(() => {
		dispatch(fetchCardsData());
	}, [dispatch]);

	useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			await sleep(1e3); // For demo purposes.

			if (active) {
				setOptions([...data]);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading, data]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	const changeHandler = (value) => {
		setValue(value);
		dispatch(CardActions.setSelectedCard(value));
		/**
		 * route to cards page on selection
		 * and highlight the selevted card
		 */
		if (value) {
			router.push('/cards');
		}
	};

	return (
		<Autocomplete
			id="Search"
			sx={{ width: 300 }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			value={value}
			onChange={(e, v) => {
				changeHandler(v);
			}}
			onClose={() => {
				setOpen(false);
			}}
			isOptionEqualToValue={(option, value) => option.title === value.title}
			getOptionLabel={(option) => option.title}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Search"
					size="small"
					color="success"
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress color="inherit" size={20} />
								) : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
}
