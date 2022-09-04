import React from 'react';

import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Button,
	MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { NavLink } from 'react-router-dom';

import SearchBar from './SearchBar';

import '../.././index.css';

import NavItems from '../../mock-data/navItems';

const Navbar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<header>
			<AppBar position="fixed">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{NavItems.map((page) => (
									<MenuItem key={page.title} onClick={handleCloseNavMenu}>
										<Typography textAlign="center">
											<NavLink to={page.to} activeClassName={'active'}>
												{page.title}
											</NavLink>
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'none', md: 'flex' },
								alignItems: 'center',
							}}
						>
							{NavItems.map((page) => (
								<Button
									key={page.title}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									<NavLink to={page.to}>{page.title}</NavLink>
								</Button>
							))}
						</Box>
						<SearchBar />
						<Box sx={{ flexGrow: 0 }}>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							></Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</header>
	);
};
export default Navbar;
