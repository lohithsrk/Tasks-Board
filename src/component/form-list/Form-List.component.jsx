import React from 'react';
import PlusSVG from '../plus-svg/Plus-svg.component';
import './Form-List.style.css';

function FormList({
	onSubmit,
	onClick,
	className,
	value,
	onChange,
	name,
	inputClassName,
	svgContainerClassName,
	plusSVGClassName,
	autofocus
}) {
	return (
		<form onSubmit={onSubmit} onClick={onClick} className={className}>
			<input
				type='text'
				className={inputClassName}
				name={name}
				placeholder='New List'
				value={value}
				onChange={onChange}
				autoFocus={autofocus}
			/>
			<div className={svgContainerClassName}>
				<input type='submit' value='' />
				<PlusSVG className={plusSVGClassName} />
			</div>
		</form>
	);
}

export default FormList;
