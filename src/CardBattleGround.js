import React from 'react';
import flow from 'lodash/flow';
import { DropTarget } from 'react-dnd';


const cardTarget = {
	hover(props, monitor, component) {
		if (!component) {
			return null
		}
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

	},

	drop(props, monitor, component) {
   			 if (monitor.didDrop()) {
      	// If you want, you can check whether some nested
     	 // target already handled drop
    	  return;
    	}

    	 // Obtain the dragged item
    	const item = monitor.getItem();

    	return props.handleDrop(item, props.player.name );
    }



}

function collect(connect, monitor){

	return{
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	isOverCurrent: monitor.isOver({ shallow: true }),
	item: monitor.getItem(),

	};
}
 class CardBattleGround extends React.Component {


	constructor(props) {
		super(props);
	}


	render() {


		const {connectDropTarget, isOver, item, isDragging} = this.props;

		return connectDropTarget(
				<div className="player-part" id={`${this.props.player.name}-part`}   >
				<div className="wrapper">
				{this.props.player.card[0] && this.props.player.card[0].attack &&

					    <div className="clash-card barbarian">
					      <div className="clash-card__image clash-card__image--barbarian">
					        <img src={this.props.player.card[0].picture} alt="barbarian" />
					      </div>
					      <div className="clash-card__unit-name">{this.props.player.card[0].name}</div>
					      <div className="clash-card__unit-description">
					        {this.props.player.card[0].quote}
					      </div>

					      <div className="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
					        <div className="one-third">
					          <div className="stat">{this.props.player.card[0].attack}</div>
					          <div className="stat-value">Attack</div>
					        </div>

					        <div className="one-third">
					          <div className="stat">{this.props.player.card[0].defense}</div>
					          <div className="stat-value">Défense</div>
					        </div>

					        <div className="one-third no-border">
					          <div className="stat">{this.props.player.card[0].life}</div>
					          <div className="stat-value">Life</div>
					        </div>

					      </div>

					    </div>

				}
				</div>
			</div>
		);
	}
}
export default flow(DropTarget('item', cardTarget, collect))(CardBattleGround)
