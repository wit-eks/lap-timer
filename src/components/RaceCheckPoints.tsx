import React from 'react';
import CheckPoint from './CheckPoint';

interface RaceCheckPointProps {
  times: number[];
  names: string[];
  onDec: any;
  onInc: any;
}

export default function RaceCheckPoints(props: RaceCheckPointProps) {
  console.log('RCP > RENDER >');
  console.log('>>> props >>>');
  console.log(props.names);
  console.log(props.times);

  return (
    <React.Fragment>
      {[...Array(props.names.length)].map((_, i) => (
        <CheckPoint
          key={i}
          time={props.times[i]}
          name={props.names[i]}
          onDecrease={() => props.onDec(i)}
          onIncrease={() => props.onInc(i)}></CheckPoint>
      ))}
    </React.Fragment>
  );
}
