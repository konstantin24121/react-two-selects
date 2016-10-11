import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';
import {expect} from 'chai';
import Dropdown from '../src/components/Dropdown';

describe('Dropdown conponent', () => {

	const renderer = renderIntoDocument(<Dropdown />)
	const dom = ReactDOM.findDOMNode(renderer);

	it('should render correctly', () => {
		return expect(renderer).to.be.ok;
	});

	it('should render with correct default values', () => {
		const defaultLabel = 'dropdown toogle';
		const defaultToggleTag = 'span';

		const label = dom.getElementsByClassName('dropdown__toggle')[0].textContent;
		const tag = dom.getElementsByClassName('dropdown__toggle')[0].tagName.toLowerCase();

		expect(label).to.equal(defaultLabel);
		expect(tag).to.equal(defaultToggleTag);
	});

	// it('should render with warning if wrong type', () => {
	// 	const type = 'table';
	// 	const renderer = renderIntoDocument.bind(null, <Dropdown type = {type}/>)
	// 	expect(renderer).to.throw(Error);
	// });

	it('should set correct state after selected', () => {
		const trueLabel = 'Mars';
		const items = [{id:1, label: trueLabel}, {id:2, label: 'Venus'}];

		const renderer = renderIntoDocument(<Dropdown list={items}/>)
		const dom = ReactDOM.findDOMNode(renderer);
		
		Simulate.click(dom.getElementsByClassName('dropdown__item')[0]);
		expect(renderer.state.selectedItem).to.equal(1);
	});
})