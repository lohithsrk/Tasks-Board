import React from 'react';
import './Task.style.css';

function Task({ task, onClick, className, handleEditClick }) {
	return (
		<div className='task-container'>
			<div className='task'>
				{className === 'green-check-circle' ? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						className={`check-circle ${className}`}
						onClick={() => onClick(task._id)}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='check-circle'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						onClick={() => onClick(task._id)}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				)}
				<span className='taskTitle'>{task.title}</span>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='edit-svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					onClick={() => handleEditClick(task)}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
					/>
				</svg>
			</div>
			<div className={task.details ? `details` : ''}>{task.details}</div>
			{task.date ? <div className='date'>{task.date}</div> : null}
		</div>
	);
}

export default Task;
