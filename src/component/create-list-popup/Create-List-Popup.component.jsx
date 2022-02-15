import React from 'react';
import FormList from '../form-list/Form-List.component';

function CreateListPopup({
	handlePopupContainerClick,
	handleAddList,
	handleFormClick,
	handleChange,
	listInput
}) {
	return (
		<div onClick={handlePopupContainerClick} className='popup-container'>
			<FormList
				onSubmit={handleAddList}
				onClick={handleFormClick}
				onChange={handleChange}
				value={listInput}
				name='ListTitle'
				className='popup'
				inputClassName='listTitleInput'
				svgContainerClassName='addSvg-container'
				plusSVGClassName='input-plus-svg'
				autofocus={true}
			/>
		</div>
	);
}

export default CreateListPopup;
