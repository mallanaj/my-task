import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useSelector, useDispatch } from 'react-redux';

import { SettingActions } from '../../../store/slice/SettingSlice';

import textAssets from '../../../utils/textAssets';

const Setting = () => {
	const dispatch = useDispatch();
	const isdark = useSelector((state) => state.setting.darkTheme);

	const themeToggleHandler = () => {
		dispatch(SettingActions.toggleTheme());
	};
	return (
		<div>
			{isdark ? textAssets.enableLight : textAssets.enableDark}
			<IconButton
				size="large"
				edge="start"
				color="inherit"
				aria-label="menu"
				sx={{ mr: 2, ml: 1 }}
				onClick={themeToggleHandler}
			>
				<DarkModeIcon></DarkModeIcon>
			</IconButton>
		</div>
	);
};

export default Setting;
