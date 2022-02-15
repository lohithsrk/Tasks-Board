import React from 'react';
import './Custom-Button.style.css';

function CustomButton({ children, className }) {
	return <button className={className}>{children}</button>;
}

export default CustomButton;
