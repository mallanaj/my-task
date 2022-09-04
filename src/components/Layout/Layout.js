import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});
const lightTheme = createTheme({
	palette: {
		mode: 'light',
	},
});
const Layout = (props) => {
	const isdark = useSelector((state) => state.setting.darkTheme);

	return (
		<ThemeProvider theme={isdark ? darkTheme : lightTheme}>
			<CssBaseline />
			<Box sx={{ bgcolor: '' }}>
				<CssBaseline />
				<Navbar />
				<Box>{props.children}</Box>
				<Footer />
			</Box>
		</ThemeProvider>
	);
};

export default Layout;
