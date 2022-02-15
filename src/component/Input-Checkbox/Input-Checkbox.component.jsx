import React from 'react';
import './Input-Checkbox.style.css';

function InputCheckbox({
	name,
	id,
	label,
	setUserCredentials,
	userCredentials
}) {
	return (
		<div className='checkbox-container'>
			<div className='span-input-container'>
				<input
					type='checkbox'
					name={name}
					id={id}
					onChange={(e) =>
						setUserCredentials((prevState) => ({
							...prevState,
							[name]: !userCredentials.rememberMe
						}))
					}
				/>
				<span className='empty-span'></span>
				<span className='tick-span'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
							clipRule='evenodd'
						/>
					</svg>
				</span>
			</div>
			<label htmlFor={id}>{label}</label>
		</div>
	);
}

export default InputCheckbox;
