import React from 'react';
import './Input.style.css';

function Input({
	type,
	name,
	id,
	label,
	placeholder,
	autoFocus,
	value,
	setUserCredentials
}) {
	return (
		<div className='input-container'>
			<label htmlFor={id} className='label'>
				{label}
			</label>
			<input
				className='input'
				id={id}
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={(e) => {
					setUserCredentials((prevState) => ({
						...prevState,
						[e.target.name]: e.target.value
					}));
				}}
				autoFocus={autoFocus}
			/>
		</div>
	);
}

export default Input;
