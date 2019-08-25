import React from 'react';
import idGenerator from 'react-id-generator';
import CardGame from './CardGame';

const update = require('immutability-helper');

class CardsGame extends React.Component {


	constructor(props) {
		super(props);

		this.getCardsPlayer = this.getCardsPlayer.bind(this);
		this.deleteCard = this.deleteCard.bind(this);
		this.moveCard = this.moveCard.bind(this);
		this.state = { playersCards: []};
	}

	getCardsPlayer(){
		let cardsGame = this.props.cards.slice();
		var arrayCard = [];
		const arrayCardIndex =[];

		for(var i = 0; i <= 4; i++ ){
			let randomIndex = cardsGame.length;
			const number = Math.floor(Math.random() * Math.floor(randomIndex));
			for(var j = 0 ; j < cardsGame.length; j++){
				cardsGame[j].index = j;
				if ( number === cardsGame[j].index){
					arrayCard.push(cardsGame[j]);
					var pos = cardsGame.indexOf(cardsGame[j]);
					cardsGame.splice(pos, 1);
				}

			}
		}
		this.setState({playersCards: arrayCard});

	}

	componentDidMount(){
		this.getCardsPlayer()
	}

	deleteCard(id){

		this.setState(prevState => {
			let items = prevState.playersCards;
			const index = items.findIndex(item => item.id === id);

			items.splice(index, 1)
			return { items}
		});
	}

	moveCard(dragIndex, hoverIndex){
		const  cards  = this.state.playersCards.slice()
		const dragCard = cards[dragIndex]


		this.setState(
			update(this.state, {
				playersCards: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
		)
	}



	render() {
		let cardGame;
			cardGame = this.state.playersCards.map(function(card, i){
			return (<CardGame
				key={`${card.id}`}
				id={`${card.id}`}
				card={card}
				player={this.props.player[0].name}
				handleDrop={(id)=> this.deleteCard(id)}
				index={i}
				text={card.name}
				moveCard={this.moveCard}
				/>);
		}, this);

		return (
				<ul>
					{cardGame}
				</ul>
		);
	}
}
export default CardsGame;
