import React from 'react';
import {toggleMod} from '@app/utils/jbem';

import './style.scss';

export default class Dropdown extends React.Component {
	static propTypes = {
		label: React.PropTypes.string,
		list: React.PropTypes.arrayOf(React.PropTypes.object),
		onSelected: React.PropTypes.func
	};

	static defaultProps  = {
		label: 'dropdown toogle',
		list: [
			{id: 1, label: 'Item 1'},
			{id: 2, label: 'Item 2'},
			{id: 3, label: 'Item 3'}
		],
		onSelected: (selectedItem) => console.log(`You select: ${selectedItem.label}` )
	};

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: null,
			listIsOpen: false
		};
	}
	componentWillMount() {
		this.toogleDropDownHandler = this.toogleDropDownHandler.bind(this)
	}

	selectItem(item, e){
		this.setState({
			selectedItem: item.id,
			listIsOpen: !this.state.listIsOpen
		});
		// снимаем обработчик click, так как выбор закрывает dropDown
		document.removeEventListener('click', this.toogleDropDownHandler);
		this.props.onSelected(item);
	}

	renderDropDownItems = () =>{
		const {selectedItem} = this.state;
		return this.props.list.map( (item) =>  
			<li 
				key = {item.id} 
				className = {`dropdown__item ${item.id === selectedItem ? 'dropdown__item_selected' : ''}`}		
				onClick = {this.selectItem.bind(this, item)}
			>
				{item.label}
			</li>
		);
	}

	toogleDropDownHandler(e){
		// Плохой вариант
		// const dropList = e.nativeEvent.target.nextSibling;
		// toggleMod(dropList, 'open');

		// Навешиваем или снимаем обработчик click по любой части документа на закрытие list 
		if(!this.state.listIsOpen){
			document.addEventListener('click', this.toogleDropDownHandler);
		}else{
			document.removeEventListener('click', this.toogleDropDownHandler);
		}
		this.setState({listIsOpen: !this.state.listIsOpen});
	}

	render() {
		let {label} = this.props;
		let {listIsOpen} = this.state;
		return (
			<span className="dropdown dropdown_inline">
				<span 
					className="dropdown__toggle" 
					onClick={this.toogleDropDownHandler.bind(this)}>{label}</span>

				<ul className={`dropdown__list ${ listIsOpen ? 'dropdown__list_open' : '' }`}>
					{this.renderDropDownItems()}
				</ul>
			</span>
		);
	}
}
