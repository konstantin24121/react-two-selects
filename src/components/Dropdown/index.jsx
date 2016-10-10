import React from 'react';
// import {toggleMod} from '@app/utils/jbem';

import './style.scss';

export const TYPE_INLINE = 'inline';
export const TYPE_BUTTON = 'button';

/**
 * 
 */
export default class Dropdown extends React.Component {

	static propTypes = {
		/**
		 * Label of dropdown toggle
		 */
		label: React.PropTypes.string,
		/**
		 * Type of toggle, may be 'button' or 'inline'
		 */
		type: React.PropTypes.oneOf([TYPE_INLINE, TYPE_BUTTON])
		/**
		 * List of dropdown items
		 */
		list: React.PropTypes.arrayOf(React.PropTypes.object),
		/**
		 * Callback calls when new item is selected
		 */
		onSelected: React.PropTypes.func,
	};

	static defaultProps  = {
		label: 'dropdown toogle',
		list: [
			{id: 1, label: 'Item 1'},
			{id: 2, label: 'Item 2'},
			{id: 3, label: 'Item 3'}
		],
		type: TYPE_INLINE,
		onSelected: (selectedItem) => console.log(`You select: ${selectedItem.label}` )
	};

	constructor(props) {
		super(props);

		this.state = {
			selectedItem: null,
			listIsOpen: false
		};

		// Autobinding
		this.toogleDropDownHandler = this.toogleDropDownHandler.bind(this)
	}

	// componentWillReceiveProps(nextProps){
	// }

	selectItem(item){
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
			<li key = {item.id} 
				className = {`dropdown__item ${item.id === selectedItem ? 'dropdown__item_selected' : ''}`}		
				onClick = {this.selectItem.bind(this, item)}
			>{item.label}</li>
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

	//Рендер toggle-элемента для открытия Dropdown списка
	//В зависимости от переданног оprops может быть представлен в виде
	//кнопки или ввиде inline-текста
	renderDropDownToggle(){
		let {label} = this.props;
		const handler = this.toogleDropDownHandler;

		if(this.props.type === TYPE_INLINE){
			return (
				<span className="dropdown__toggle" onClick={handler}>{label}</span>
			)
		}else if( this.props.type === TYPE_BUTTON ){
			let iconImg;
			if ( this.props.icon ){
				iconImg = <img className="dropdown__icon" width="18px" src={this.props.icon} />
			}
			return (
				<button className="dropdown__toggle dropdown__toggle_button" onClick={handler}>
					{iconImg}{label}
				</button>
			)
		}
		return (<span></span>);
	}

	render() {
		let {listIsOpen} = this.state;
		return (
			<span className="dropdown dropdown_inline">
				{this.renderDropDownToggle()}

				<ul className={`dropdown__list ${ listIsOpen ? 'dropdown__list_open' : '' }`}>
					{this.renderDropDownItems()}
				</ul>
			</span>
		);
	}
}
