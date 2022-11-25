import React from 'react';
import { ChangeButtonProps } from '../models/ChangeButtonProps';
import LtIcon from './icons/LtIcon';

export default class IncreaseButton extends React.Component<ChangeButtonProps> {
  render() {
    return (
      <React.Fragment>
        {/*looks like button is better, when div is used a click may select nect cell in row too :D :? */}
        <button onClick={this.props.onClick} className="button">
          <LtIcon name="mountain-arrow-up" color="#FFFFFF" size={24} />
        </button>
      </React.Fragment>
    );
  }
}
