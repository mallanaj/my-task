import { createSlice } from '@reduxjs/toolkit';

import dummy from '../../mock-data/cardsData.js';

let dataExist = false;

const initialState = {
	cardsData: [],
	loadingCardsData: false,
};
const cardSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {
		setCardsData(state, actions) {
			state.cardsData = actions.payload;
		},
		loadingData(state) {
			state.loadingCardsData = !state.loadingCardsData;
		},
		deleteCard(state, actions) {
			const itemToDelete = actions.payload;
			state.cardsData = state.cardsData.filter(
				(item) => item.id !== itemToDelete
			);
		},
		setSelectedCard(state, action) {
			if (action.payload) {
				state.cardsData = state.cardsData.map((card) => {
					if (card.id === action.payload.id)
						return { ...action.payload, selecetd: true };
					else return card;
				});
			} else {
				// clear selecetion
				state.cardsData = state.cardsData.map((card) => {
					if (card.selecetd) return { ...card, selecetd: false };
					else return card;
				});
			}
		},
	},
});

// Thunk fn
const fetchCardsData = () => {
	if (dataExist)
		return async (dispatch) => {
			dispatch({ type: '' });
		};
	return async (dispatch) => {
		dispatch(CardActions.loadingData());
		setTimeout(() => {
			dispatch(CardActions.setCardsData(dummy));
			dispatch(CardActions.loadingData());
			dataExist = true;
		}, 1000);
	};
};

const CardActions = cardSlice.actions;
export { CardActions, fetchCardsData };

export default cardSlice.reducer;
