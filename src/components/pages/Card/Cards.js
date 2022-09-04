import { useEffect } from 'react';
import Card from './Card';

import * as React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCardsData, CardActions } from '../../../store/slice/CardSlice';

import classes from './Cards.module.css';
import textAssets from '../../../utils/textAssets';

const Cards = () => {
	const { cardsData, loadingCardsData } = useSelector((state) => state.card);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCardsData());
	}, [dispatch]);

	if (loadingCardsData) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress color="inherit" />
			</Box>
		);
	}

	if (cardsData.length === 0) {
		return (
			<div className={classes.container}>
				<Box sx={{ display: 'flex' }}>
					<Typography textAlign="center">{textAssets.noCard}</Typography>
				</Box>
			</div>
		);
	}

	const deleteCardHandler = (id) => {
		dispatch(CardActions.deleteCard(id));
	};

	return (
		<div className={classes.container}>
			{cardsData?.map((data) => {
				return (
					<Card
						key={data.id}
						title={data.title}
						raised={data.selecetd}
						description={data.description}
						id={data.id}
						onDelete={deleteCardHandler}
					/>
				);
			})}
		</div>
	);
};

export default Cards;
