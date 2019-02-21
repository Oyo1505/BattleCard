import React, { Fragment } from 'react';
import idGenerator from 'react-id-generator';
import  Modal from 'react-bootstrap/lib/Modal';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Player from './Player';
import CardsGame from './CardsGame';
import Ground from './Ground';
import cards from '../json/cards.json';

 class BattleGround extends React.Component {

	constructor(props) {
		super(props);
		this.htmlId = idGenerator();
		this.toggle = this.toggle.bind(this);
		this.changeName = this.changeName.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
			this.state= { 
				end:true,
				playerOne : [{
					name:'player-1',
					
				}],
				playerTwo:[{
					name:'player-2',
					
				}],
			};
	}
	
	toggle(){
			this.setState({end: !this.state.end});
	};
	 handleClose() {
	 	
    	this.setState({ end: false });
  	}
  	changeName(){

  			this.handleClose
  	}
  	handleChange(event) {
  	 event.preventDefault();
   	 
   	 const player = event.target.dataset.name;
   	
   	 if(player === 'player-1'){

   	 	this.setState({playerOne:[{name:event.target.value}]});
   	 }else if(player === 'player-2'){
   	 	this.setState({playerTwo:[{name:event.target.value}]});
   	 }

  	}

	render() {
		return (
			<div id="battlecard" >
						 	<>
							 	<Modal 
							 	show={this.state.end}   
							 	onHide={this.handleClose}
							 	size="lg"
							    aria-labelledby="contained-modal-title-vcenter"
							    centered
							     >
							    <Modal.Header closeButton>
					                          
							    <Modal.Title> 
									         
									<h4>Chosse you Nickname</h4>
								</Modal.Title>
								</Modal.Header>	      
							    <Modal.Body>
									<label>Player 1 : <input onChange={this.handleChange} data-name="player-1" /></label>
									<label>Player 2 : <input onChange={this.handleChange} data-name="player-2" /></label>
									<label><button onClick={this.handleClose} > Submit</button></label>
								</Modal.Body>
								
							 	</Modal>
						 	</>				
		
				<aside id="player-1" className="elements-battlecard player">
					<Player player={this.state.playerOne}> 
						<CardsGame  cards={cards} player={this.state.playerOne}  /> 
					</Player>
				</aside>

				<section id="battlegound" className="elements-battlecard">
						BattleGround
						<Ground playerOne={this.state.playerOne} playerTwo={this.state.playerTwo} />
				</section>

				<aside id="player-2" className="elements-battlecard player">
					<Player player={this.state.playerTwo}> 
						<CardsGame  cards={cards} player={this.state.playerTwo}  /> 
					</Player>
				</aside>
		
				<div className="clearfix"></div>
				
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(BattleGround);