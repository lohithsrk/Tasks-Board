import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../App';

import Input from '../../component/Input/Input.component';
// import InputCheckbox from '../../component/Input-Checkbox/Input-Checkbox.component';
import CustomButton from '../../component/Custom-Button/Custom-Button.component';
import Navbar from '../../component/navbar/Navbar.component.jsx';
import './Login.style.css';

function Login() {
	const match = useRouteMatch();
	const history = useHistory();
	const [userCredentials, setUserCredentials] = useState({
		email: '',
		password: '',
		rememberMe: false
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(
			auth,
			userCredentials.email,
			userCredentials.password
		)
			.then((user) => {
				history.push('/');
			})
			.catch((error) => {
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	};

	return (
		<div className='login'>
			<Navbar url={match.path} />
			<h1>Log in!</h1>
			<form className='login-form' onSubmit={handleSubmit}>
				<Input
					id='email'
					type='name'
					name='email'
					label='Email Address'
					value={userCredentials.email}
					setUserCredentials={setUserCredentials}
					placeholder='Enter Email'
					autoFocus
				/>
				<Input
					id='password'
					type='password'
					name='password'
					value={userCredentials.password}
					setUserCredentials={setUserCredentials}
					label='Password'
					placeholder='Enter Password'
				/>
				{/* <InputCheckbox
					id='login-checkbox'
					name='rememberMe'
					label='Remember me'
					setUserCredentials={setUserCredentials}
					userCredentials={userCredentials}
				/> */}
				<CustomButton className='login-button'>Log in</CustomButton>
			</form>
		</div>
	);
}

export default Login;
