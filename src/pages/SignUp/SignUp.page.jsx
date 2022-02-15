import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../App';

import Input from '../../component/Input/Input.component';
// import InputCheckbox from '../../component/Input-Checkbox/Input-Checkbox.component';
import CustomButton from '../../component/Custom-Button/Custom-Button.component';
import Navbar from '../../component/navbar/Navbar.component';
import './SignUp.style.css';

function SignUp() {
	const match = useRouteMatch();
	const history = useHistory();
	const [userCredentials, setUserCredentials] = useState({
		email: '',
		password: '',
		username: ''
	});
	const [profile, setProfile] = useState('');

	useEffect(() => {
		const random = Math.floor(Math.random() * 1000);
		fetch(`https://picsum.photos/id/${random}/info`)
			.then((res) => res.json())
			.then(async (data) => setProfile(data.download_url));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(
			auth,
			userCredentials.email,
			userCredentials.password
		)
			.then(async () => {
				await updateProfile(auth.currentUser, {
					displayName: userCredentials.username,
					protoURL: profile
				});
				history.push('/');
			})
			.catch((error) => {
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	};

	return (
		<div className='signup'>
			<Navbar url={match.path} auth={auth} />
			<h1>Sign up</h1>
			<form className='signup-form' onSubmit={handleSubmit}>
				<Input
					id='username'
					type='name'
					name='username'
					label='Username'
					value={userCredentials.username}
					setUserCredentials={setUserCredentials}
					placeholder='Enter Name'
					autoFocus
				/>
				<Input
					id='email'
					type='name'
					name='email'
					value={userCredentials.email}
					setUserCredentials={setUserCredentials}
					label='Email Address'
					placeholder='Enter Email'
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
					id='signup-checkbox'
					name='signup-checkbox'
					label='I accept the terms & conditions'
				/> */}
				<CustomButton className='sign-up-button'>Sign up</CustomButton>
			</form>
		</div>
	);
}

export default SignUp;
