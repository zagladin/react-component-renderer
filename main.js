import React from 'react';
import ReactDOM from 'react-dom';
import Views from './components';
import './style.css';

const errors = {
	noName: "Error: JSON does not contains <strong><u>'name'</u></strong>",
	notFound: 'Component with name <strong><u>{name}</u></strong> was not found',
	wrongJSON: 'Cannot read Component, WRONG json format',
};

const generateData = () => {
	const placeholders = document.querySelectorAll('.template');
	const array = Array.from(placeholders);
	const data = array.map((e) => {
		try {
			return JSON.parse(e.querySelector('.template__data').innerHTML);
		} catch (e) {
			console.error('Invalid JSON format', e);
			return null;
		}
	});
	if (Object.entries(data).length) renderData(data, placeholders);
};

const renderData = (data, placeholders) => {
	data.map((json, index) => {
		let component;
		if (json && json.name && Views[json.name]) {
			component = React.createElement(Views[json.name], json.params);
		} else if (!json.name) {
			component = React.createElement('div', {
				dangerouslySetInnerHTML: { __html: errors.noName },
			});
		} else if (json.name && !Views[json.name]) {
			component = React.createElement('div', {
				dangerouslySetInnerHTML: { __html: errors.notFound.replace('{name}', json.name) },
			});
		} else {
			component = React.createElement('div', {}, errors.wrongJSON);
		}
		ReactDOM.render(component, placeholders[index]);
	});
};

generateData();
