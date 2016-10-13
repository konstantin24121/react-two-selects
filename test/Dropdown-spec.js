import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';
import {expect} from 'chai';
import Dropdown from '../src/components/Dropdown';

describe('Dropdown conponent', () => {

	const renderer = renderIntoDocument(<Dropdown />)

	it('should render correctly', () => {
		return expect(renderer).to.be.ok;
	});

	it('should set correct state after selected', () => {
		const items = [{id:1, label: 'Mars'}, {id:2, label: 'Venus'}];

		const renderer = renderIntoDocument(<Dropdown list={items}>toggle</Dropdown>)
		const dom = ReactDOM.findDOMNode(renderer);
		
		Simulate.click(dom.getElementsByClassName('dropdown__item')[0]);
		expect(renderer.state.selectedItem).to.equal(1);
	});
})