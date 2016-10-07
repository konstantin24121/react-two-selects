import React from "react";
import { Panel, Row, Col } from "react-bootstrap";
import InlineDropdown from "./components/InlineDropdown";
import './styles.scss';

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			jsonData: null,
			inlineDropdownSelect: null,
			buttonDropdownSelect: null,
		};
	}

	componentWillMount() {
		// Используем лоадер, тк используется единожды 
		// в конфиги webpack выносить не стал
		var json = require("json!./data.json");
		this.setState({jsonData: json});
	}

	inlineDropDownHandler(selectItem){
		this.setState({inlineDropdownSelect: selectItem});
	}
	
	buttonDropDownHandler(selectItem){
		this.setState({buttonDropdownSelect: selectItem});
	}

	render() {
		let items = this.state.jsonData.lineList;
		let {inlineDropdownSelect, buttonDropdownSelect} = this.state;

		return (
			<div className="container">
				<Row>
					<Col xs={12}>
						<Panel>
							<Row>
								<Col xs={8}>
									Выберете <InlineDropdown 
										label='правильный' 
										list={items} 
										onSelected = {this.inlineDropDownHandler.bind(this)}
									/> вариант
								</Col>
								<Col xs={4} className="text-right"> 
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
								<Col xs={8}>
									Выберете <InlineDropdown 
										label='правильный' 
										list={items} 
										onSelected = {this.buttonDropDownHandler.bind(this)}
									/> вариант
								</Col>
								<Col xs={4} className="text-right"> 
									{inlineDropdownSelect ? 
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
