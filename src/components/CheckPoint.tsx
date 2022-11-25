import React from 'react';
import IncreaseButton from './IncreaseButton';
import DecreaseButton from './DecreaseButton';
import { Row, Col } from 'react-grid-system';

interface CheckPointProps {
  time: number;
  name: string;
  onDecrease: any;
  onIncrease: any;
}

export default function CheckPoint(props: CheckPointProps) {
  function toTimeString(val: number) {
    const minutes = Math.round(val / 60);
    const hh = Math.floor(minutes / 60);
    const mm = minutes - hh * 60;
    return hh + ':' + String(mm).padStart(2, '0');
  }

  return (
    <React.Fragment>
      <Row>
        <Col md={4}>{props.name}</Col>
        <Col md={2}>
          <DecreaseButton onClick={props.onDecrease}></DecreaseButton>
        </Col>
        <Col md={2}> {toTimeString(props.time)}</Col>
        <Col md={2}>
          <IncreaseButton onClick={props.onIncrease}></IncreaseButton>
        </Col>
      </Row>
      {/* <DecreaseButton onClick={props.onDecrease}></DecreaseButton>{props.name}
                <IncreaseButton onClick={props.onIncrease}></IncreaseButton>{toTimeString(props.time)} */}
    </React.Fragment>
  );
}
