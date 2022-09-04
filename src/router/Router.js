import { Route, Redirect, Switch } from 'react-router-dom';

import { Container } from '@mui/material';

import Table from '../components/pages/Table/Table';
import Cards from '../components/pages/Card/Cards';
import Setting from '../components/pages/Setting/Setting';

function Router() {
	return (
		<Container
			maxWidth="lg"
			sx={{
				pt: 12,
				pb: 8,
				minHeight: '92vh',
			}}
		>
			<Switch>
				<Route exact path="/">
					<Redirect to="/table" />
				</Route>
				<Route exact path="/table">
					<Table />
				</Route>
				<Route path="/cards">
					<Cards />
				</Route>
				<Route path="/setting">
					<Setting />
				</Route>
			</Switch>
		</Container>
	);
}

export default Router;
