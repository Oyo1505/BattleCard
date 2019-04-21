import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { DropTarget } from 'react-dnd';
import CardBattleGround from './CardBattleGround';


class Ground extends React.Component {

	constructor(props) {
		super(props);


		this.handleDrop = this.handleDrop.bind(this);
		this.handleBattle = this.handleBattle.bind(this);
		this.getTurnAttack = this.getTurnAttack.bind(this);

		this.state = {
						players:[{
							name:'player-1',
							card:[]
						},
						{
							name:'player-2',
							card: []
						}]
					 }
	}



	handleDrop(item, player){

		const playersArray = this.state.players.slice();
		for(var i = 0; i < this.state.players.length; i++ ){
			if( item.player === this.state.players[i].name){

				var pos = playersArray[i].card.indexOf(playersArray[i].card);
				playersArray[i].card.splice(pos,1)
				playersArray[i].card.push(item.card)
			}
		}
		this.setState({players:playersArray});

	}

	handleBattle(){
		var playersArray = this.state.players.slice();

		for(var i = 0; i < playersArray.length; i++ ){
				var attack =  playersArray[i].card[0].attack;
				const weakness = playersArray[i].card[0].weakness;

			 if(!this.state.players[i].card[0] ||
				this.state.players[i].card === undefined ||
				this.state.players[i].card[0].life < 0 ||
				this.state.players[i].card == 'undefined' ||
				!attack ||
				this.state.players[i].card[0].attack === undefined ||
				this.state.players[i].card[0].attack == 'undefined'
				){

			 	alert(`Put a card ${this.state.players[i].name}`)
				var pos = playersArray[i].card.indexOf(playersArray[i].card[0]);

				playersArray[i].card.splice(pos,1);

			}
			else if(playersArray[i].card[0].life > 0 && playersArray[i].name == this.state.players[i].name ){

				 var attack =  playersArray[i].card[0].attack;
				 var classCharacter =  playersArray[i].card[0].class;
				 var arrayAttAndWeakness = [attack, classCharacter]
				 this.getTurnAttack(playersArray[i].name,arrayAttAndWeakness, playersArray);

			}

		}

		this.setState({players:playersArray});

	}

	getTurnAttack(player,attack ,array){

			//give a random number for attack and defense
		var attackPercent = Math.floor(Math.random() * (30 - 15)) + 15;
		var defPercent = 	Math.floor(Math.random() * (35 - 15)) + 15;

		for( var i = 0 ; i < array.length; i++){

			if(player !== array[i].name && array[i].card[0].life >= 0 && array[i].card[0].defense >= 0 && attack[1] !== array[i].card[0].weakness){

					// return a percentage of attack and defense
					var attackWPercent = Math.round((attack[0] * attackPercent)/100);
					var defWPercent = Math.round((attack[0] * defPercent)/100);


					// soustraction for life and defense
					var lifeCard =  array[i].card[0].life - attackWPercent;
					var defenseCard  =  array[i].card[0].defense - defWPercent;

					array[i].card[0].life = lifeCard;
					array[i].card[0].defense = defenseCard;

					return array[i].card[0];

			}else if (player !== array[i].name && array[i].card[0].life >= 0 && array[i].card[0].defense >= 0 && attack[1] === array[i].card[0].weakness){

				//the attack is more powerful because the weakness card ennemy is the same as the card class

					// return a percentage of attack and defense
					var attackWPercent = Math.round((attack[0] * attackPercent)/100);
					var defWPercent = Math.round((attack[0] * defPercent)/100);


					// soustraction for life and defense
					var lifeCard =  Math.round(array[i].card[0].life - (attackWPercent * 1.5));
					var defenseCard  =  Math.round(array[i].card[0].defense - (defWPercent * 1.2));

					array[i].card[0].life = lifeCard;
					array[i].card[0].defense = defenseCard;

					return array[i].card[0];

			}else if(player !== array[i].name && array[i].card[0].life >= 0 && array[i].card[0].defense <= 0){

				var attackNoDefPercent = Math.floor(Math.random() * (60 - 15)) + 15;
				var lifeCard =  array[i].card[0].life - Math.round((attack[0] * attackNoDefPercent)/100);

				array[i].card[0].life = lifeCard;
				array[i].card.defense = 0;

				return array[i].card[0];

			}else if(!attack ||	attack === undefined || attack == 'undefined' || !array[i].card[0].life || array[i].card[0].life === undefined){

			}
		}

	}


	render() {

		var playersMap;

		if(this.state.players){
				 playersMap = this.state.players.map((player,i) => {
							if(!player.card[0]){
								return	<CardBattleGround key={player.name} player={player}    name={player.name} card={player.card} handleDrop={this.handleDrop}  />;
							}else{

								return	<CardBattleGround key={player.name} player={player} defense={player.card[0].defense} life={player.card[0].life}  name={player.name} card={player.card} handleDrop={this.handleDrop}  />;
							}
				})
			}
		return (
			<div>
			<div  className="target">

				{playersMap}

			</div>

			<button onClick={this.handleBattle} className="button-battle" > FIN DU TOUR </button>

			</div>
		);
	}
}
export default Ground;

Ground.propTypes = {
	players: PropTypes.array,
	card: PropTypes.array,
}
