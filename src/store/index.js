import { configureStore } from '@reduxjs/toolkit';
import settingReducer from './slice/SettingSlice';
import cardReducer from './slice/CardSlice';
import tableReducer from './slice/TableSlice';

const store = configureStore({
	reducer: { setting: settingReducer, card: cardReducer, table: tableReducer },
});

export default store;
