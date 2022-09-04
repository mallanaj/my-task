import CardMui from '@mui/material/Card';
import { CardActions, CardContent, Typography } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Card = ({ title, description, raised, id, onDelete }) => {
	return (
		<CardMui
			sx={{
				maxWidth: 275,
				height: 250,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				...(raised && {
					border: '2px solid yellow',
				}),
			}}
			raised={raised}
		>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					onClick={() => onDelete(id)}
				>
					<DeleteIcon></DeleteIcon>
				</IconButton>
			</CardActions>
		</CardMui>
	);
};

export default Card;
