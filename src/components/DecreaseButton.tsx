import React from 'react';
import { ChangeButtonProps } from '../models/ChangeButtonProps';
import LtIcon from './icons/LtIcon';

export default class DecreaseButton extends React.Component<ChangeButtonProps> {
  render() {
    return (
      <React.Fragment>
        <button onClick={this.props.onClick} className="button">
          <LtIcon name="mountain-arrow-down" color="#FFFFFF" size={24} />
        </button>
      </React.Fragment>
    );
  }
}
