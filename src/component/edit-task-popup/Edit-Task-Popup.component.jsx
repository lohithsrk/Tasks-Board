import React from 'react';
import './Edit-Task-Popup.style.css';

function EditTaskPopup({
	className,
	setEditClicked,
	setDetails,
	setDate,
	handleBinClick,
	handleDetailsSubmit,
	list,
	lists,
	task,
	details,
	date,
	handleMoveClick
}) {
	return (
		<div className='edit-task-popup-container'>
			<form
				className='edit-task-popup'
				onSubmit={(e) => handleDetailsSubmit(e)}
			>
				<div className='all-list'>
					{lists.map((l, index) => {
						if (list._id === l._id) return null;
						return (
							<div
								key={index}
								onClick={() => handleMoveClick(list._id, task._id, l._id)}
							>
								{l.title}
							</div>
						);
					})}
					<div className='up-arrow'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							onClick={() =>
								(document.querySelector('.all-list').style.top = '-100%')
							}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 15l7-7 7 7'
							/>
						</svg>
					</div>
				</div>
				<div className='utilities'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='bin'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						onClick={handleBinClick}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
						/>
					</svg>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='close-svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						onClick={() => setEditClicked(false)}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</div>
				<div className='list-title'>
					{list.title} - {task.title}
				</div>
				<textarea
					name='taskDetails'
					placeholder='Add details'
					onChange={(e) => setDetails(e.target.value)}
					value={details}
				>
					{task.details ? task.details : null}
				</textarea>
				<input
					type='date'
					name='date'
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<div
					className='transfer'
					onClick={() => (document.querySelector('.all-list').style.top = '0')}
				>
					Move to another list
				</div>
				<span className='submit'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M5 13l4 4L19 7'
						/>
					</svg>
					<input type='submit' value='' />
				</span>
			</form>
		</div>
	);
}

export default EditTaskPopup;
