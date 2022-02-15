import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';

import '../List.style.css';
import ListHeader from '../list-header/List-header.component';
import FormList from '../../form-list/Form-List.component';
import Task from '../tasks/Task.component';
import EditTaskPopup from '../../edit-task-popup/Edit-Task-Popup.component';

function ListContainer({ list }) {
	const [taskTitle, setTaskTitle] = useState('');
	const [completedTasks, setCompletedTasks] = useState([]);
	const [inCompleteTasks, setInCompleteTasks] = useState([]);
	const [editClicked, setEditClicked] = useState(false);
	const [currentTask, setCurrentTask] = useState(null);
	const [details, setDetails] = useState('');
	const [date, setDate] = useState('');

	const dispatch = useDispatch();

	const lists = useSelector((state) => state.lists);

	const setTasks = useCallback(() => {
		setCompletedTasks(
			list.tasks.length > 0 &&
				list.tasks.filter((task) => task.completed === true)
		);
		setInCompleteTasks(
			list.tasks.length > 0 &&
				list.tasks.filter((task) => task.completed !== true)
		);
	}, [list.tasks]);

	useEffect(() => {
		setTasks();
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') setEditClicked(false);
		});
	}, [list.tasks, setTasks]);

	const handleChange = (e) => {
		setTaskTitle(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!taskTitle) return;
		await dispatch({
			type: 'ADD_TASK',
			payload: {
				parentId: list._id,
				title: list.title.trim(),
				task: {
					title: taskTitle.trim(),
					completed: false,
					_id: uuid(),
					details: null
				}
			}
		});
		setTaskTitle('');
	};

	const handleCompleteClick = (_id) => {
		dispatch({
			type: 'UPDATE_COMPLETED',
			payload: {
				_id,
				parentId: list._id
			}
		});
		setTasks();
	};

	const handleBinClick = () => {
		currentTask &&
			dispatch({
				type: 'REMOVE_TASK',
				payload: {
					_id: currentTask._id,
					parentId: list._id
				}
			});
		setEditClicked(false);
	};

	const handleEditClick = (task) => {
		setCurrentTask(task);
		setEditClicked(!editClicked);
		setDetails(task.details);
		setDate(task.date);
	};
	const handleDetailsSubmit = (e) => {
		e.preventDefault();
		dispatch({
			type: 'ADD_TASK_DETAILS',
			payload: {
				parentId: list._id,
				_id: currentTask._id,
				details: details.trim(),
				date
			}
		});
		setEditClicked(false);
	};

	const handleMoveClick = (parentId, _id, toId) => {
		dispatch({
			type: 'MOVE_TASK',
			payload: {
				parentId,
				_id,
				toId
			}
		});
		setTasks();
		setEditClicked(false);
	};

	return (
		<div className=''>
			{editClicked ? (
				<EditTaskPopup
					task={currentTask}
					setEditClicked={setEditClicked}
					handleDetailsSubmit={handleDetailsSubmit}
					handleBinClick={handleBinClick}
					list={list}
					setDetails={setDetails}
					setDate={setDate}
					details={details}
					date={date}
					lists={lists}
					handleMoveClick={handleMoveClick}
				/>
			) : null}
			<div className='list-container'>
				<ListHeader listInput={list.title} />
				<div className='list-body'>
					<FormList
						onSubmit={handleSubmit}
						name='taskTitle'
						onChange={handleChange}
						value={taskTitle}
						className={
							list.tasks ? 'list-body-input-form-1' : 'list-body-input-form'
						}
						inputClassName='list-body-input'
						svgContainerClassName='addTaskSvg-container'
						plusSVGClassName='input-plus-svg'
					/>
					{inCompleteTasks &&
						inCompleteTasks.map((task, index) => {
							return (
								<div key={index}>
									<Task
										handleEditClick={handleEditClick}
										key={index}
										onClick={handleCompleteClick}
										task={task}
									/>
								</div>
							);
						})}

					{completedTasks && completedTasks.length ? (
						<div className=''>
							<span className='completed'>
								Completed ({completedTasks && completedTasks.length})
							</span>
							{completedTasks.map((task, index) => {
								return (
									<div className=''>
										<Task
											handleEditClick={handleEditClick}
											className='green-check-circle'
											key={index}
											onClick={handleCompleteClick}
											task={task}
										/>
									</div>
								);
							})}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default ListContainer;
