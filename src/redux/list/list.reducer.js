const ListReducer = (state = [], action) => {
	const remainingLists = state.filter((s) => {
		return s._id !== action.payload.parentId;
	});

	let foundList = state.filter((s) => {
		return s._id === action.payload.parentId;
	});

	switch (action.type) {
		case 'ADD_LIST':
			return [action.payload, ...state];
		case 'ADD_TASK':
			let foundTask = {};
			foundTask.title = action.payload.title;
			if (foundList[0].tasks) {
				foundTask.tasks = [action.payload.task, ...foundList[0].tasks];
			} else {
				foundTask.tasks = [action.payload.task];
			}
			foundTask._id = foundList[0]._id;
			return [foundTask, ...remainingLists];

		case 'UPDATE_COMPLETED':
			let foundTasks = foundList[0].tasks.filter((task) => {
				return task._id === action.payload._id;
			});

			foundTasks[0].completed = !foundTasks[0].completed;
			return [foundList[0], ...remainingLists];

		case 'REMOVE_TASK':
			let foundTasksRemove = foundList[0].tasks.filter((task) => {
				return task._id !== action.payload._id;
			});

			foundList[0].tasks = foundTasksRemove;

			return [foundList[0], ...remainingLists];

		case 'ADD_TASK_DETAILS':
			let foundTaskDetails = foundList[0].tasks.filter((task) => {
				return task._id === action.payload._id;
			});

			foundTaskDetails[0].details = action.payload.details;
			foundTaskDetails[0].date = action.payload.date;
			return [foundList[0], ...remainingLists];

		case 'MOVE_TASK':
			let remainingTasks =
				foundList[0].tasks.length &&
				foundList[0].tasks.filter((task) => task._id !== action.payload._id);
			if (foundList[0].tasks.length === 1) {
				var toMove = foundList[0].tasks.filter(
					(task) => task._id === action.payload._id
				);
				foundList[0].tasks = [];
			} else {
				toMove = foundList[0].tasks.filter(
					(task) => task._id === action.payload._id
				);
			}

			let destination = state.filter((s) => s._id === action.payload.toId);

			let listToUpdate = remainingLists.filter(
				(s) => s._id !== action.payload.toId
			);
			if (destination[0].tasks && destination[0].tasks.length) {
				destination[0].tasks = [toMove[0], ...destination[0].tasks];
			} else {
				destination[0].tasks = [toMove[0]];
			}
			foundList[0].tasks = [...remainingTasks];
			return [destination[0], foundList[0], ...listToUpdate];
		default:
			return state;
	}
};

export default ListReducer;
