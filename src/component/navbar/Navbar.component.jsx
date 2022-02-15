import React from 'react';
import { signOut } from '@firebase/auth';
import { auth } from '../../App';
import { useSelector, useDispatch } from 'react-redux';

import logoWhite from '../../resource/logo.png';
import logo from '../../resource/logo-colored.png';
import './Navbar.style.css';

function Navbar({ url }) {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleSignout = async () => {
		await signOut(auth);
		await dispatch({ type: 'REMOVE_USER', payload: { user: null } });
	};

	return (
		<div
			className={`navbar ${
				url !== '/login' && url !== '/signup' ? 'dark-nav' : null
			}`}
		>
			<div className='logo-container'>
				<a href='/'>
					<img
						src={url === '/login' || url === '/signup' ? logo : logoWhite}
						alt='Loading...'
					/>
				</a>
				<a href='/'>
					<h1 className={url !== '/login' && url !== '/signup' ? 'h1' : null}>
						TasksBoard
					</h1>
				</a>
			</div>
			<ul
				className={`navlink-container ${
					url !== '/login' && url !== '/signup'
						? 'dark-navlink-container'
						: null
				}`}
			>
				<li className='navlink'>
					<a href='/'>Home</a>
				</li>

				{!user ? (
					<>
						<li className='navlink'>
							<a href='/login'>Login</a>
						</li>
						<li className='navlink'>
							<a href='/signup'>Signup</a>
						</li>
					</>
				) : (
					<li className='navlink'>
						<a href='/login' onClick={handleSignout}>
							Logout
						</a>
					</li>
				)}
				<span></span>
			</ul>
		</div>
	);
}

export default Navbar;
