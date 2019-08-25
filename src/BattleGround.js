import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import idGenerator from 'react-id-generator';
import Modal from 'react-bootstrap/Modal';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Player from './Player';
import CardsGame from './CardsGame';
import Ground from './Ground';
import cards from '../../json/cards.json';
import cardsPlayer2 from '../../json/cards-2.json';

 class BattleGround extends React.Component {

	constructor(props) {
		super(props);
		this.htmlId = idGenerator();
		this.toggle = this.toggle.bind(this);
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


				<aside id="player-1" className="elements-battlecard player">
					<Player player={this.state.playerOne}>
						<CardsGame  cards={cards} player={this.state.playerOne}   />
					</Player>
				</aside>

				<section id="battlegound" className="elements-battlecard">
						BattleGround
						<Ground playerOne={this.state.playerOne} playerTwo={this.state.playerTwo}  />
				</section>

				<aside id="player-2" className="elements-battlecard player">
					<Player player={this.state.playerTwo}>
						<CardsGame  cards={cardsPlayer2} player={this.state.playerTwo}  />
					</Player>
				</aside>

				<div className="clearfix"></div>

			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(BattleGround);

BattleGround.propTypes = {
	end: PropTypes.bool,
	playerOne: PropTypes.object,
	playerTwo: PropTypes.object,
}
