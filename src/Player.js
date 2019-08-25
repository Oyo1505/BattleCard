import React from 'react';

 class Player extends React.Component {

	render() {
		const {children} = this.props;

		return (
			<div>
				<h1> {this.props.player[0].name}</h1>
					{children}
			</div>
		);
	}
}
export default Player
