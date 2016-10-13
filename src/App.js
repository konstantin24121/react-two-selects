import React from "react";
import { Panel, Row, Col } from "react-bootstrap";

import Dropdown from "./components/Dropdown";
import './styles.scss';

let buttonIcon = require('@static/icons/calendar.svg');

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			jsonData: null,
			inlineDropdownSelect: null,
			buttonDropdownSelect: null
		};
	}

	componentWillMount() {
		// Используем лоадер, тк используется единожды 
		// в конфиги webpack выносить не стал
		var json = require("json!./data.json");
		this.setState({jsonData: json});
	}

	inlineDropDownHandler = (selectItem) => {
		this.setState({inlineDropdownSelect: selectItem});
	}
	
	buttonDropDownHandler = (selectItem) => {
		this.setState({buttonDropdownSelect: selectItem});
	}

	render() {
		let {lineList, buttonList} = this.state.jsonData;
		let {inlineDropdownSelect, buttonDropdownSelect} = this.state;

		// setTimeout(() => this.setState({jsonData: {buttonList: this.state.jsonData.lineList}}), 4000);
		return (
			<div className="container">
				<Row>
					<Col xs={12}>
						<Panel>
							<Row>
								<Col xs={6}>
									Выберете <Dropdown 
										list={lineList} 
										onSelected={this.inlineDropDownHandler}>
										правильный
									</Dropdown> вариант
								</Col>
								<Col xs={6} className="text-right"> 
									{inlineDropdownSelect ? 
										`Выбран: ${inlineDropdownSelect.label}`:
										'Пока что ничего не выбрано'
									}
								</Col>
							</Row>
						</Panel>
					</Col>
				</Row>
				
				<Row>
					<Col xs={12}>
						<Panel>
							<Row>
								<Col xs={6}>
									<Dropdown 
										list ={buttonList} 
										onSelected={this.buttonDropDownHandler}>
										<button className="toggle toggle_button">
											<img className="toggle__icon" width="18px" src={buttonIcon} /> Вариант
										</button>
									</Dropdown>
								</Col>
								<Col xs={6} className="text-right"> 
									{buttonDropdownSelect ? 
										`Выбран: ${buttonDropdownSelect.label}`:
										'Пока что ничего не выбрано'
									}
								</Col>
							</Row>
						</Panel>
					</Col>
				</Row>
			</div>
		);
	}
}
