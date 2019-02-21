import React, {Fragment} from 'react';
import flow from 'lodash/flow';
import { DropTarget } from 'react-dnd';
import CardBattleGround from './CardBattleGround';


class Ground extends React.Component {

	constructor(props) {
		super(props);
		
		
		this.handleDrop = this.handleDrop.bind(this);
		this.handleBattle = this.handleBattle.bind(this);
		this.getTurnAttack = this.getTurnAttack.bind(this);
		this.deleteCard = this.deleteCard.bind(this);
		this.state = { 
						players:[{ 
							name:'player-1',
							card:[]
						},
						{
							name: 'player-2',
							card: []
						}]
					 } 
	}

	deleteCard(id, player){
		console.log(player)
		/*this.setState(prevState => {
			let items = prevState.player.card;
			const index = items.findIndex(item => item.id == id);

			items.splice(index, 1)
			return { items}
		});*/
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

			 if(!this.state.players[i].card[0].life || 
				this.state.players[i].card === undefined || 
				this.state.players[i].card[0].life < 0 || 
				this.state.players[i].card == 'undefined'){
				var pos = playersArray[i].card.indexOf(playersArray[i].card);
				playersArray[i].card.splice(pos,1);
		
			}
			else if(playersArray[i].card[0].life > 0 && playersArray[i].name == 'player-1' ){
				 var attack =  playersArray[i].card[0].attack;
				 this.getTurnAttack(playersArray[i].name,attack, playersArray);	 				
			}else if(playersArray[i].card[0].life > 0 && playersArray[i].name == 'player-2'){			
				 var attack =  playersArray[i].card[0].attack;
				 this.getTurnAttack(playersArray[i].name,attack, playersArray);				

			}

		}
	
		this.setState({players:playersArray});
		
	}

	getTurnAttack(player,attack ,array){
	
		for( var i = 0 ; i < array.length; i++){
			if(player !== array[i].name && array[i].card[0].life >= 0){
			
					var lifeCard =  array[i].card[0].life - attack;			
					array[i].card[0].life = lifeCard;
			
					return array[i].card[0];
			}else if(player !== array[i].name && array[i].card[0].life < 0){
				console.log('jesu is lodsdq')
			}
		}


		
	}

	render() {
	
		var playersMap;
		const players = [this.props.playerOne, this.props.playerTwo ]

		if(this.state.players){
				 playersMap = this.state.players.map((player,i) => {
							if(!player.card[0]){
								return	<CardBattleGround key={player.name} player={player}   name={player.name} card={player.card} handleDrop={this.handleDrop}  />;
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