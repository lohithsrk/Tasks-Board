import { Switch, Route, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import Home from './pages/Home/Home.page';
import Login from './pages/Login/Login.page';
import SignUp from './pages/SignUp/SignUp.page';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAFokbfLQZGizOuEldNZj86TOlzKUsFR8U',
	authDomain: 'tasks-board-a67f9.firebaseapp.com',
	projectId: 'tasks-board-a67f9',
	storageBucket: 'tasks-board-a67f9.appspot.com',
	messagingSenderId: '671397408641',
	appId: '1:671397408641:web:686decc462e13281a54280',
	measurementId: 'G-BZ2P3XQY2E'
};

initializeApp(firebaseConfig);

export const auth = getAuth();

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch({ type: 'SAVE_USER', payload: user.providerData[0] });
		}
	});

	return (
		<div>
			<Switch>
				<Route
					exact
					path='/'
					render={() => (user ? <Home /> : <Redirect to='/login' />)}
				/>
				<Route
					exact
					path='/login'
					render={() => (user ? <Redirect to='/' /> : <Login />)}
				/>
				<Route
					exact
					path='/signup'
					render={() => (user ? <Redirect to='/' /> : <SignUp />)}
				/>
			</Switch>
		</div>
	);
}

export default App;
