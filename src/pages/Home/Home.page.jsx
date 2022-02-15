import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid';

import './Home.style.css';
import Navbar from '../../component/navbar/Navbar.component';
import ListContainer from '../../component/list/list-container/List-Container.component';
import PlusSVG from '../../component/plus-svg/Plus-svg.component';
import CreateListPopup from '../../component/create-list-popup/Create-List-Popup.component';

function Home() {
	const match = useRouteMatch();
	const [newListClicked, setNewListClicked] = useState(false);
	const [listInput, setListInput] = useState('');

	const lists = useSelector((state) => state.lists);
	const dispatch = useDispatch();

	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') handlePopupContainerClick();
		});
	}, []);

	const handleOpenPopup = () => {
		setNewListClicked(true);
	};

	const handleAddList = async (e) => {
		e.preventDefault();
		if (!listInput.length) return;
		await dispatch({
			type: 'ADD_LIST',
			payload: {
				_id: uuid(),
				title: listInput.trim(),
				tasks: [],
				completed: false
			}
		});
		setListInput('');
		handlePopupContainerClick();
	};

	const handleFormClick = (e) => {
		e.stopPropagation();
	};

	const handlePopupContainerClick = () => {
		setNewListClicked(false);
		setListInput('');
	};

	const handleChange = (e) => setListInput(e.target.value);

	return (
		<div className='home'>
			<Navbar url={match.path} />
			{newListClicked && (
				<CreateListPopup
					handlePopupContainerClick={handlePopupContainerClick}
					handleAddList={handleAddList}
					handleFormClick={handleFormClick}
					handleChange={handleChange}
					listInput={listInput}
				/>
			)}
			<div className='list-grid'>
				{lists.map((list, index) => (
					<ListContainer key={index} list={list} onChange={handleChange} />
				))}
			</div>
			<div>
				<PlusSVG handleClick={handleOpenPopup} className='plus-svg' />
			</div>
		</div>
	);
}

export default Home;
