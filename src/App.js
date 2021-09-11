import { Switch, Route } from 'react-router';
import './App.css';

import Home from './pages/Home/Home.page';
import Login from './pages/Login/Login.page';
import SignUp from './pages/SignUp/SignUp.page';
function App() {
	return (
		<div>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={SignUp} />
			</Switch>
		</div>
	);
}

export default App;
