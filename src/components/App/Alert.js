import React, {Component} from 'react';

class Alert extends Component {
  render() {
    return (
      <div className={`alert ${this.props.status ? 'success' : 'error'}`}>
				<span>{this.props.text}</span>
      </div>
    );
  }
}

export default Alert;