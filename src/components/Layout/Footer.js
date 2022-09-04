import React from 'react';

import { Paper, Typography } from '@mui/material';

const footerText = 'Mallanagouda';
const Footer = () => {
	return (
		<Paper elevation={0} variant="outlined">
			<Typography textAlign="center" sx={{ my: 2 }}>
				&copy; <em id="date">2022</em> {footerText}
			</Typography>
		</Paper>
	);
};

export default Footer;
