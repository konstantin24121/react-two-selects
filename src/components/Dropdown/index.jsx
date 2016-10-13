import React from 'react';
import classnames from 'classnames';
// import {toggleMod} from '@app/utils/jbem';

import './style.scss';

/**
 * 
 */
export default class Dropdown extends React.Component {

	static propTypes = {
		/**
		 * List of dropdown items
		 */
		list: React.PropTypes.arrayOf(React.PropTypes.object),
		/**
		 * Callback calls when new item is selected
		 */
		onSelected: React.PropTypes.func
	};

	static defaultProps  = {
		list: [],
		onSelected: () => {}
	};

	constructor(props) {
		super(props);

		this.state = {
			selectedItem: null,
			listIsOpen: false
		};
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.closeDropDown);
	}

	componentWillReceiveProps(nextProps){
		this.setState(nextProps)
	}

	selectItem = (item) => {
		this.setState({
			selectedItem: item.id,
			listIsOpen: false
		});
		// снимаем обработчик click, так как выбор закрывает dropDown
		document.removeEventListener('click', this.closeDropDown);
		this.props.onSelected(item);
	}

	openDropDown = () => {
		document.addEventListener('click', this.closeDropDown);
		this.setState({listIsOpen: true});
	}

	closeDropDown = () => {
		document.removeEventListener('click', this.closeDropDown);
		this.setState({listIsOpen: false});
	}

	renderDropDownItems = () =>{
		const {selectedItem} = this.state;
		return this.props.list.map( (item) => {
			const itemClass = classnames({
				'dropdown__item': true,
				'dropdown__item_selected': item.id === selectedItem
			});
			return <li key={item.id} className={itemClass} onClick={() => this.selectItem(item)}>
				{item.label}</li>
		} 
		);
	}

	render() {
		const {listIsOpen} = this.state;
		const handler = listIsOpen ? this.closeDropDown : this.openDropDown;
		const listClass = classnames({
			'dropdown__list': true,
			'dropdown__list_open': listIsOpen
		});
		return (
			<span className="dropdown">
				<span className="dropdown__toggle" onClick={handler}>
					{this.props.children}
				</span>
				<ul className={listClass}>
					{this.renderDropDownItems()}
				</ul>
			</span>
		);
	}
}
