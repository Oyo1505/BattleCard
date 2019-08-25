import React from 'react';
import { findDOMNode } from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import {
    DragSource,
    DropTarget,
    ConnectDropTarget,
    ConnectDragSource,
    DropTargetMonitor,
    DropTargetConnector,
    DragSourceConnector,
    DragSourceMonitor,
} from 'react-dnd'
import flow from 'lodash/flow';
import { XYCoord } from 'dnd-core';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
}

const cardSource = {
    beginDrag(props) {

        return {
            id: props.id,
            index: props.index,
            player: props.player,
            card: props.card,
        }
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }
        return props.handleDrop(props.card.id);
    }
}



function collect(connect, monitor) {

    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }

}

class CardGame extends React.Component {


    constructor(props) {
        super(props);
        this.state = { end: false };
        this.toggle = this.toggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    toggle() {
        this.setState({ end: !this.state.end });
    };
    handleClose() {
        this.setState({ end: false });
    }
    render() {

        const {
            text,
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props
        const card = this.props.card;
        const opacity = isDragging ? 0.5 : 1;

        return connectDragSource(

            <li>
				<div className="card-game" style={{opacity}} draggable>
					<div className="card-game-image">
						<img src={card.thumbnail} width="100%" height="100%" />
					</div>

					<div className="card-game-details">
						 <h4 className="mdl-card__title-text">{card.name}</h4>
						 <span>Life : {card.life}</span>
						 <ul>
						 	<li>Attack : {card.attack}</li>
						 	<li>Defense : {card.defense}</li>
						 </ul>
						 	<>
						 		<button  onClick={this.toggle}>Details</button>
							 	<Modal
							 	show={this.state.end}
							 	onHide={this.handleClose}
							 	size="lg"
							    aria-labelledby="contained-modal-title-vcenter"
							    centered
							     >
							    <Modal.Header closeButton>

									            <Modal.Title>
									            <img className="picture-character-modal"
									             src={card.picture}
									             id={`picture-${card.id}`}
									             />
									      <h3 className="title-character-modal">{card.name}</h3>
									      </Modal.Title>
									 </Modal.Header>
									       <Modal.Body>
									       <ul>
									       		<li>Attack : {card.attack}</li>
											 	<li>Defense : {card.defense}</li>
											 	<li>Race: {card.race}</li>
											 	<li>Class: {card.class}</li>
											 	<li>Weakness: {card.weakness}</li>

											</ul>
											<blockquote> <cite>"{card.quote}"</cite></blockquote>
									       </Modal.Body>

							 	</Modal>
						 	</>
					</div>
					<div className="clearfix"></div>
				</div>
			</li>, );


    }
}


export default flow(
    DragSource('item', cardSource, collect)
)(CardGame);